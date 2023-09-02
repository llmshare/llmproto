export default class OpenAI {
  private _temperature: number;

  constructor(temperature: number = 0) {
    this._temperature = temperature;
  }

  get temperature(): number {
    return this._temperature;
  }

  set temperature(value: number) {
    if (value < 0 || this.temperature === value) return;

    // Decimal values
    // if (
    //   Math.abs(this.temperature * 10 - value) === 1 ||
    //   Math.abs(this.temperature - value) === 1
    // ) {
    //   console.log("1 diff");
    //   this._temperature = value / 10;
    //   return;
    // }

    this._temperature = value;
  }
}
