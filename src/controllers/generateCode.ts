import axios from "axios";

type LLM = {
  instanceName?: string;
  temperature: number;
  name: string;
};

type TextSplitter = {
  instanceName?: string;
  name: string;
  chunkSize: number;
};

type Chain = {
  instanceName?: string;
  type: string;
  returnIntermediateSteps: boolean;
  name: string;
};

type GeneratedCode = {
  importStatement: string;
  code: string;
};

// Function to create a Langchain
const createLangchain = async (data: any) => {
  const res = await axios.post("/api/langchain", data);
  const { id } = res.data;

  return id;
};

// Function to generate LLM import statement and code
function generateLLM(llm: LLM): GeneratedCode {
  const importStatement = `import { ${
    llm.name
  } } from "langchain/llms/${llm.name.toLowerCase()}";`;
  const code = `const ${llm?.instanceName || "llm"} = new ${
    llm.name
  }({ temperature: ${llm.temperature} });`;
  return { importStatement, code };
}

// Function to generate TextSplitter import statement and code
function generateTextSplitter(textSplitter: TextSplitter): GeneratedCode {
  const importStatement = `import { ${textSplitter.name} } from "langchain/text_splitter";
import * as fs from "fs";`;

  const code = `const text = fs.readFileSync("state_of_the_union.txt", "utf8");
const ${
    textSplitter?.instanceName || "textSplitter"
  } = new RecursiveCharacterTextSplitter({ chunkSize: ${
    textSplitter.chunkSize
  } });
const docs = await textSplitter.createDocuments([text]);`;

  return { importStatement, code };
}

// Function to generate LoadSummarizationChain code
function generateLoadSummarizationChain(
  chain: Chain,
  llm: LLM,
  textSplitter: TextSplitter,
): string {
  const { importStatement: LLMImport, code: LLMCode } = generateLLM(llm);
  const { importStatement: textSplitterImport, code: textSplitterCode } =
    generateTextSplitter(textSplitter);

  const importStatement = `${LLMImport}\nimport { ${chain.name} } from "langchain/chains";\n${textSplitterImport}`;
  const code = `${LLMCode}\n// This convenience function creates a document chain prompted to summarize a set of documents.
  const ${chain?.instanceName || "chain"} = ${chain.name}(model, {
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
