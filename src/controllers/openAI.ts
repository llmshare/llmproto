import axios from "axios";

import OpenAI from "@/models/BaseLLM/OpenAI";

export const createLLMModel = async (id: number) => {
  await axios.post(`/api/langchain/${id}/llm`);

  return new OpenAI(id);
};

export const getModel = async (id: number) => {
  const res = await axios(`/api/openAI/${id}`);
  const { llm } = res.data;

  const openAI = new OpenAI(id);
  openAI.initialTemperature = llm.temperature;

  return openAI;
};

export const setTemperature = async (id: number, temperature: number) => {
  await axios.post(`/api/openAI/${id}`, { temperature });
};
