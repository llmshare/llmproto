import axios from "axios";

export default class LoadSummarizationChain {
  private readonly _id: number;

  private _initialType: string;

  private _initialReturnIntermediateSteps: boolean;

  constructor(id: number) {
    this._id = id;
    this._initialType = "";
    this._initialReturnIntermediateSteps = false;
  }

  get id(): number {
    return this._id;
  }

  get initialType() {
    return this._initialType;
  }

  set initialType(value) {
    this._initialType = value;
  }

  get initialReturnIntermediateSteps() {
    return this._initialReturnIntermediateSteps;
  }

  set initialReturnIntermediateSteps(value) {
    this._initialReturnIntermediateSteps = value;
  }

  async setType(value: string) {
    await axios.post(`/api/chain/${this._id}`, {
      type: "type",
      value,
    });
  }

  async setReturnIntermediateSteps(value: boolean) {
    await axios.post(`/api/chain/${this._id}`, {
      type: "returnIntermediateSteps",
      value,
    });
  }

  async setInstanceName(value: string) {
    await axios.post(`/api/chain/${this._id}`, {
      type: "instanceName",
      value,
    });
  }
}
