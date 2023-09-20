import axios from "axios";

const createLangchain = async (data: any) => {
  const res = await axios.post("/api/langchain", data);
  const { id } = res.data;

  return id;
};

function generateLLM(llm: { temperature: number; name: string }) {
  const importStatement = `import { ${
    llm.name
  } } from "langchain/llms/${llm.name.toLowerCase()}";`;
  const code = `const chain = new ${llm.name}({ temperature: ${llm.temperature} });`;
  return { importStatement, code };
}

function generateTextSplitter(textSplitter: {
  name: string;
  chunkSize: number;
}) {
  const importStatement = `import { ${textSplitter.name} } from "langchain/text_splitter";
import * as fs from "fs";`;

  const code = `const text = fs.readFileSync("state_of_the_union.txt", "utf8");
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);`;

  return { importStatement, code };
}

function generateLoadSummarizationChain(
  chain: {
    type: string;
    returnIntermediateSteps: boolean;
    name: string;
  },
  llm: { temperature: number; name: string },
  textSplitter: { chunkSize: number; name: string },
) {
  const { importStatement: LLMImport, code: LLMCode } = generateLLM(llm);

  const { importStatement: textSplitterImport, code: textSplitterCode } =
    generateTextSplitter(textSplitter);

  const importStatement = `${LLMImport}\nimport { ${chain.name} } from "langchain/chains";\n${textSplitterImport}`;
  const code = `${LLMCode}\n// This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = ${chain.name}(model, {
  type: ${chain.type},
  returnIntermediateSteps: ${chain.returnIntermediateSteps},
});\n
${textSplitterCode}\n
const res = await chain.call({
  input_documents: docs,
});
console.log({ res });`;

  return `${importStatement}\n\n${code}`;
}

export { createLangchain, generateLoadSummarizationChain };
