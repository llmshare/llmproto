import axios from "axios";

export default class CharacterTextSplitter {
  private readonly _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  async setCharacterTextSplitter(value: number) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "chunkSize",
      value,
    });
  }

  async setInstanceName(value: string) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "instanceName",
      value,
    });
  }
}
