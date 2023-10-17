import axios from "axios";

import CharacterTextSplitter from "@/models/TextSplitters/CharacterTextSplitter";
import RecursiveCharacterTextSplitter from "@/models/TextSplitters/RecursiveCharacterTextSplitter";

export const createRecursiveCharacterTextSplitter = async (id: string) => {
  await axios.post(`/api/langchain/${id}/textSplitter/recursiveCharacter`);

  return new RecursiveCharacterTextSplitter(id);
};

export const createCharacterTextSplitter = async (id: string) => {
  await axios.post(`/api/langchain/${id}/textSplitter/character`);

  return new CharacterTextSplitter(id);
};

export const setTemperature = async (id: string, chunkSize: number) => {
  await axios.post(`/api/textSplitter/${id}`, { chunkSize });
};
