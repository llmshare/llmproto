import axios from "axios";

import { updateField } from "@/controllers/openAI";

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

  async setInstanceName(value: string) {
    await updateField(this.id, "instanceName", value);
  }

  async setTemperature(value: number) {
    await updateField(this.id, "temperature", value);
  }

  async setBatchSize(value: number) {
    await updateField(this.id, "batchSize", value);
  }

  async setModelName(value: string) {
    await updateField(this.id, "modelName", value);
  }
}
