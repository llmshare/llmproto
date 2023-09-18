import axios from "axios";

const createLangchain = async (data: any) => {
  const res = await axios.post("/api/langchain", data);
  const { id } = res.data;

  return id;
};

const generateCode = async (
  chain: { type: string; returnIntermediateSteps: boolean },
  llm: { temperature: number },
) => `import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

const text = fs.readFileSync("state_of_the_union.txt", "utf8");
const model = new OpenAI({ temperature: ${llm.temperature}); // --> Updating temperature based on OpenAI node
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);

const chain = loadSummarizationChain(model, {
  type: ${chain.type}, // --> Updating type based on Chain node
  returnIntermediateSteps: ${chain.returnIntermediateSteps}},
});
const res = await chain.call({
  input_documents: docs,
});`;
export default generateCode;

export { createLangchain };
