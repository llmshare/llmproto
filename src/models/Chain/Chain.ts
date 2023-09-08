import axios from "axios";

export default class Chain {
  private readonly _id: number;

  private _initialType: string;

  private _returnIntermediateSteps: boolean;

  constructor(id: number) {
    this._id = id;
    this._initialType = "";
    this._returnIntermediateSteps = false;
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

  get returnIntermediateSteps() {
    return this._returnIntermediateSteps;
  }

  set returnIntermediateSteps(value) {
    this._returnIntermediateSteps = value;
  }

  async setType(value: string) {
    await axios(`/api/chain/${this._id}`, {
      method: "POST",
      data: { type: value },
    });
  }

  async setReturnIntermediateSteps(value: boolean) {
    await axios(`/api/chain/${this._id}`, {
      method: "POST",
      data: { returnIntermediateSteps: value },
    });
  }
}
