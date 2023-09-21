import axios from "axios";

import LoadSummarizationChain from "@/models/Chains/LoadSummarizationChain";

export const createChain = async (id: number) => {
  await axios.post(`/api/langchain/${id}/chain`);

  return new LoadSummarizationChain(id);
};

export const getChain = async (id: number) => {
  const chain = new LoadSummarizationChain(id);

  const res = await axios(`/api/chain/${id}`);

  const { type, returnIntermediateSteps } = res.data;

  chain.initialType = type;
  chain.initialReturnIntermediateSteps = returnIntermediateSteps;

  return chain;
};

export const setType = async (id: number, type: string) => {
  await axios(`/api/chain/${id}`, {
    method: "POST",
    data: { type },
  });
};
