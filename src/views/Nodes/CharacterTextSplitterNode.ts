import { ClassicPreset } from "rete";

import CharacterTextSplitter from "@/models/TextSplitters/CharacterTextSplitter";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class CharacterTextSplitterNode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  { instanceName: LabelledInputControl; chunkSize: LabelledInputControl }
> {
  height = 180;

  width = 380;

  private _characterTextSplitter: CharacterTextSplitter;

  constructor(
    characterTextSplitter: CharacterTextSplitter,
    socket: ClassicPreset.Socket,
  ) {
    super("CharacterTextSplitter");

    this._characterTextSplitter = characterTextSplitter;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.characterTextSplitter.setInstanceName(str);
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

          await this.characterTextSplitter.setCharacterTextSplitter(num);
        },
        "number",
      ),
    );

    this.addOutput("output", new ClassicPreset.Output(socket));
  }

  get characterTextSplitter(): CharacterTextSplitter {
    return this._characterTextSplitter;
  }

  set characterTextSplitter(value: CharacterTextSplitter) {
    this._characterTextSplitter = value;
  }
}
