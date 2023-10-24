import axios from "axios";

import GooglePalmAI from "@/models/BaseLLM/GooglePalmAI";

export const createLLMModel = async (id: string) => {
  await axios.post(`/api/langchain/${id}/llm`);

  return new GooglePalmAI(id);
};

export const getModel = async (id: string) => {
  const res = await axios(`/api/googlepalmAI/${id}`);
  const { llm } = res.data;

  const googlepalmAI = new GooglePalmAI(id);
  googlepalmAI.initialTemperature = llm.temperature;

  return googlepalmAI;
};

export const updateField = async (
  id: string,
  type: string,
  value: string | number,
) => {
  await axios.post(`/api/googlepalmAI/${id}`, { type, value });
};
