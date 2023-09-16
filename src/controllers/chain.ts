import axios from "axios";

import LoadSummarizationChain from "@/models/Chains/LoadSummarizationChain";

export const createChain = async () => {
  const res = await axios("/api/chain", {
    method: "POST",
  });

  const { id } = res.data;

  return new LoadSummarizationChain(id);
};

export const getChain = async (id: number) => {
  const chain = new LoadSummarizationChain(id);

  const res = await axios(`/api/chain/${id}`);

  console.log({ data: res.data });

  const { type, returnIntermediateSteps } = res.data;

  chain.initialType = type;
  chain.initialReturnIntermediateSteps = returnIntermediateSteps;

  return chain;
};

export const setTypeOnDB = async (id: number, type: string) => {
  await axios(`/api/chain/${id}`, {
    method: "POST",
    data: { type },
  });
};
