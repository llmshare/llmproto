import axios from "axios";

import { setTemperature } from "@/controllers/openAI";

// export class OpenAI
// extends BaseLLM<OpenAICallOptions>
// implements OpenAIInput, AzureOpenAIInput

export default class OpenAI {
  private readonly _id: string;

  private _initialTemperature: number;

  constructor(id: string) {
    this._id = id;
    this._initialTemperature = 0;
  }

  get id(): string {
    return this._id;
  }

  get initialTemperature(): number {
    return this._initialTemperature;
  }

  set initialTemperature(value) {
    this._initialTemperature = value;
  }

  // unable to use currently
  async getTemperature(): Promise<number> {
    return axios(`/api/openAI/${this.id}`).then((res) => {
      const { temperature } = res.data;

      return temperature;
    });
  }

  async setTemperature(value: number) {
    await setTemperature(this.id, value);
  }
}
