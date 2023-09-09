import axios from "axios";

import OpenAI from "@/models/BaseLLM/OpenAI";

export const createOpenAI = async () => {
  const res = await axios("/api/openAI", {
    method: "POST",
  });

  const { id } = res.data;

  return new OpenAI(id);
};

export const getOpenAI = async (id: number) => {
  const openAI = new OpenAI(id);

  const res = await axios(`/api/openAI/${id}`);

  const { temperature } = res.data;

  openAI.initialTemperature = temperature;

  return openAI;
};
