import axios from "axios";

import CohereAI from "@/models/BaseLLM/CohereAI";

export const createCohereAiLLMModel = async (id: string) => {
  await axios.post(`/api/langchain/${id}/llm`);

  return new CohereAI(id);
};

export const getModel = async (id: string) => {
  const res = await axios(`/api/cohereAI/${id}`);
  const { llm } = res.data;

  const cohereAI = new CohereAI(id);
  cohereAI.initialTemperature = llm.temperature;

  return cohereAI;
};

export const updateField = async (
  id: string,
  type: string,
  value: string | number,
) => {
  await axios.post(`/api/cohereAI/${id}`, { type, value });
};
