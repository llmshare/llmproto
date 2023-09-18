import axios from "axios";

const createLangchain = async (data: any) => {
  const res = await axios.post("/api/langchain", data);
  const { id } = res.data;

  return id;
};

const generateCode = async () =>
  `import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

const text = fs.readFileSync("state_of_the_union.txt", "utf8");
const model = new OpenAI({ temperature: 0 }); // --> Updating temperature based on OpenAI node
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);

const chain = loadSummarizationChain(model, {
  type: type, // --> Updating type based on Chain node
  returnIntermediateSteps: true,
});
const res = await chain.call({
  input_documents: docs,
});
console.log({ res });`;
export default generateCode;

export { createLangchain };
