import { ClassicPreset } from "rete";

import RecursiveCharacterTextSplitter from "@/models/TextSplitters/RecursiveCharacterTextSplitter";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class RecursiveCharacterTextSplitterNode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  {
    instanceName: LabelledInputControl;
    chunkSize: LabelledInputControl;
    chunkOverlap: LabelledInputControl;
    separator: LabelledInputControl;
  }
> {
  height = 280;

  width = 380;

  private _recursiveCharacterTextSplitter: RecursiveCharacterTextSplitter;

  constructor(
    recursiveCharacterTextSplitter: RecursiveCharacterTextSplitter,
    socket: ClassicPreset.Socket,
  ) {
    super("RecursiveCharacterTextSplitter");

    this._recursiveCharacterTextSplitter = recursiveCharacterTextSplitter;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.recursiveCharacterTextSplitter.setInstanceName(str);
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

          await this.recursiveCharacterTextSplitter.setChunkSize(num);
        },
        "number",
      ),
    );

    this.addControl(
      "chunkOverlap",
      new LabelledInputControl(
        "chunk overlap",
        200,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.recursiveCharacterTextSplitter.setChunkOverlap(num);
        },
        "number",
      ),
    );

    this.addControl(
      "separator",
      new LabelledInputControl(
        "separator",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.recursiveCharacterTextSplitter.setSeparator(str);
        },
        "text",
      ),
    );

    this.addOutput("output", new ClassicPreset.Output(socket));
  }

  get recursiveCharacterTextSplitter(): RecursiveCharacterTextSplitter {
    return this._recursiveCharacterTextSplitter;
  }

  set recursiveCharacterTextSplitter(value: RecursiveCharacterTextSplitter) {
    this._recursiveCharacterTextSplitter = value;
  }
}
