import OpenAI from "@/Models/OpenAI/OpenAI";

export default class Code {
  private _openAI: OpenAI;

  constructor(openAI: OpenAI) {
    this._openAI = openAI;
  }

  get openAI(): OpenAI {
    return this._openAI;
  }

  set openAI(value: OpenAI) {
    this._openAI = value;
  }

  generate(): string {
    return `import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

const text = fs.readFileSync("state_of_the_union.txt", "utf8");
const model = new OpenAI({ temperature: ${this._openAI.id} }); // --> Updating temperature based on OpenAI node
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
  }
}
