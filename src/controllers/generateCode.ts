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
  const code = `// This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = new ${llm.name}({ temperature: ${llm.temperature} });`;
  return { importStatement, code };
}

function generateLoadSummarizationChain(chain: {
  type: string;
  returnIntermediateSteps: boolean;
  name: string;
}) {
  const importStatement = `import { ${chain.name} } from "langchain/chains";`;
  const code = `// This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = ${chain.name}(model, {
  type: ${chain.type},
  returnIntermediateSteps: ${chain.returnIntermediateSteps},
});`;
  return { importStatement, code };
}

const generateCode = async (
  chain: { type: string; returnIntermediateSteps: boolean; name: string },
  llm: { temperature: number; name: string },
) => {
  generateLoadSummarizationChain(chain);
  generateLLM(llm);
};

export default generateCode;

export { createLangchain };
