import OpenAI from "@/Models/OpenAI/OpenAI";

export const createOpenAI = async () => {
  const response = await fetch("/api/openAI", {
    method: "POST",
  });
  const data = await response.json();

  const { id } = data;

  return new OpenAI(id);
};

export const getOpenAI = async (id: number) => {
  const openAI = new OpenAI(id);

  openAI.initialTemperature = await fetch(`/api/openAI/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const { temperature } = data;

      return temperature;
    });

  return openAI;
};
