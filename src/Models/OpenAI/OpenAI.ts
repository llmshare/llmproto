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

  async getTemperature(): Promise<number> {
    return fetch(`/api/openAI/${this._id}`)
      .then((res) => res.json())
      .then((data) => {
        const { temperature } = data;

        return temperature;
      });
  }

  async setTemperature(value: number) {
    await fetch(`/api/openAI/${this._id}`, {
      method: "POST",
      body: JSON.stringify({ temperature: value }),
    });
  }
}
