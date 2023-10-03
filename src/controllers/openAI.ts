import axios from "axios";

import OpenAI from "@/models/BaseLLM/OpenAI";

export const createLLMModel = async (id: string) => {
  await axios.post(`/api/langchain/${id}/llm`);

  return new OpenAI(id);
};

export const getModel = async (id: string) => {
  const res = await axios(`/api/openAI/${id}`);
  const { llm } = res.data;

  const openAI = new OpenAI(id);
  openAI.initialTemperature = llm.temperature;

  return openAI;
};

export const updateField = async (
  id: string,
  type: string,
  value: string | number,
) => {
  await axios.post(`/api/openAI/${id}`, { type, value });
};
