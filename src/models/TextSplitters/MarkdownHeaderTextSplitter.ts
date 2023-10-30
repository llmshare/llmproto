import axios from "axios";

export default class MarkdownHeaderTextSplitter {
  private readonly _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  async setInstanceName(value: string) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "instanceName",
      value,
    });
  }

  async setHeadersToSplitOn(value: string) {
    await axios.post(`/api/textSplitter/${this._id}`, {
      type: "HeadersToSplitOn",
      value,
    });
  }
}
