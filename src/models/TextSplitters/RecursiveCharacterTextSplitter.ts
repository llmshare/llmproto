import axios from "axios";

export default class RecursiveCharacterTextSplitter {
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

  async setIsRegexSeparator(value: string) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "isSeparatoRegex",
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

  async setSeparators(value: string) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "separators",
      value,
    });
  }
}
