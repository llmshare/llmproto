import axios from "axios";

export default class TokenTextSplitter {
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

  async setEncodingName(value: string) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "encodingName",
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
