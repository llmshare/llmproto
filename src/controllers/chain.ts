import axios from "axios";

import Chain from "@/models/Chain/Chain";

export const createChain = async () => {
  const res = await axios("/api/chain", {
    method: "POST",
  });

  const { id } = res.data;

  return new Chain(id);
};

export const getChain = async (id: number) => {
  const chain = new Chain(id);

  const res = await axios(`/api/chain/${id}`);

  console.log({ data: res.data });

  const { type, returnIntermediateSteps } = res.data;

  chain.initialType = type;
  chain.returnIntermediateSteps = returnIntermediateSteps;

  return chain;
};
