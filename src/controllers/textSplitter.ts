import axios from "axios";

import RecursiveCharacterTextSplitter from "@/models/TextSplitters/RecursiveCharacterTextSplitter";

export const createTextSplitter = async (id: string) => {
  await axios.post(`/api/langchain/${id}/textSplitter`);

  return new RecursiveCharacterTextSplitter(id);
};

export const setTemperature = async (id: string, chunkSize: number) => {
  await axios.post(`/api/textSplitter/${id}`, { chunkSize });
};
