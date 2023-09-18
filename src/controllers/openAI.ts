import axios from "axios";

import OpenAI from "@/models/BaseLLM/OpenAI";

export const createOpenAIModel = async (id: number) => {
  await axios.post(`/api/langchain/${id}/llm`);

  return new OpenAI(id);
};

export const getModel = async (id: number) => {
  const openAI = new OpenAI(id);

  const res = await axios(`/api/openAI/${id}`);

  const { temperature } = res.data;

  openAI.initialTemperature = temperature;

  return openAI;
};

export const setTemperature = async (id: number, temperature: number) => {
  await axios(`/api/openAI/${id}`, {
    method: "POST",
    data: { temperature },
  });
};
