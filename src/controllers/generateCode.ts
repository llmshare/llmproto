import { eq } from "drizzle-orm";

import db from "@/db/database";
import { openAI } from "@/db/schema";

const generateCode = async (openAI_ID: number) => {
  const item = await db.select().from(openAI).where(eq(openAI.id, openAI_ID));

  return `import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

const text = fs.readFileSync("state_of_the_union.txt", "utf8");
const model = new OpenAI({ temperature: ${item[0].temperature} }); // --> Updating temperature based on OpenAI node
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);

const chain = loadSummarizationChain(model, {
  type: "map_reduce",
  returnIntermediateSteps: true,
});
const res = await chain.call({
  input_documents: docs,
});
console.log({ res });`;
};

export default generateCode;
