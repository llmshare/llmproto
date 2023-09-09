import axios from "axios";

//export class OpenAI
//extends BaseLLM<OpenAICallOptions>
// implements OpenAIInput, AzureOpenAIInput


export default class OpenAI {
  private readonly _id: number;

  private _initialTemperature: number;

  constructor(id: number) {
    this._id = id;
    this._initialTemperature = 0;
  }

  get id(): number {
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
    return axios(`/api/openAI/${this._id}`).then((res) => {
      const { temperature } = res.data;

      return temperature;
    });
  }

  async setTemperature(value: number) {
    await axios(`/api/openAI/${this._id}`, {
      method: "POST",
      data: { temperature: value },
    });
  }
}
