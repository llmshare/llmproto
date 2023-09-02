export default class OpenAI {
  private _temperature: number;

  constructor(temperature: number = 0) {
    this._temperature = temperature;
  }

  get temperature(): number {
    return this._temperature;
  }

  set temperature(value: number) {
    this._temperature = value;
  }
}
