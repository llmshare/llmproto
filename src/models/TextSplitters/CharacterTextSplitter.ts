import axios from "axios";

export default class CharacterTextSplitter {
  private readonly _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  async setChunkSize(value: number) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "chunkSize",
      value,
    });
  }

  async setChunkOverlap(value: number) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "chunkOverlap",
      value,
    });
  }

  async setSeparator(value: string) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "separator",
      value,
    });
  }

  async setIsRegexSeparator(value: string) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "isSeparatorRegex",
      value,
    });
  }

  async setLengthFunction(value: string) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "LengthFunction",
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
