import { ClassicPreset } from "rete";

import RecursiveCharacterTextSplitter from "@/models/TextSplitters/RecursiveCharacterTextSplitter";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class RecursiveCharacterTextSplitterNode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  { chunkSize: LabelledInputControl }
> {
  height = 180;

  width = 280;

  private _recursiveCharacterTextSplitter: RecursiveCharacterTextSplitter;

  constructor(
    recursiveCharacterTextSplitter: RecursiveCharacterTextSplitter,
    socket: ClassicPreset.Socket,
  ) {
    super("RecursiveCharacterTextSplitter");

    this._recursiveCharacterTextSplitter = recursiveCharacterTextSplitter;

    this.addControl(
      "chunkSize",
      new LabelledInputControl(
        "chunk size",
        1000,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.recursiveCharacterTextSplitter.setRecursiveCharacterTextSplitter(
            num,
          );
        },
        "number",
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
