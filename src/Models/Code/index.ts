import OpenAI from "@/Models/OpenAI";

export default class Code {
  private _openAI: OpenAI;

  constructor(openAI: OpenAI) {
    this._openAI = openAI;
  }

  get openAI(): OpenAI {
    return this._openAI;
  }

  set openAI(value: OpenAI) {
    this._openAI = value;
  }
}
