import { ClassicPreset } from "rete";

import TokenTextSplitter from "@/models/TextSplitters/TokenTextSplitter";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class TokenTextSplitterNode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  { instanceName: LabelledInputControl; chunkSize: LabelledInputControl }
> {
  height = 180;

  width = 380;

  private _tokenTextSplitter: TokenTextSplitter;

  constructor(
    tokenTextSplitter: TokenTextSplitter,
    socket: ClassicPreset.Socket,
  ) {
    super("TokenTextSplitter");

    this._tokenTextSplitter = tokenTextSplitter;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.tokenTextSplitter.setInstanceName(str);
        },
        "text",
      ),
    );

    this.addControl(
      "chunkSize",
      new LabelledInputControl(
        "chunk size",
        1000,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.tokenTextSplitter.setTokenTextSplitter(num);
        },
        "number",
      ),
    );

    this.addOutput("output", new ClassicPreset.Output(socket));
  }

  get tokenTextSplitter(): TokenTextSplitter {
    return this._tokenTextSplitter;
  }

  set tokenTextSplitter(value: TokenTextSplitter) {
    this._tokenTextSplitter = value;
  }
}
