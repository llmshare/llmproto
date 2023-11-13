import { ClassicPreset } from "rete";

import CharacterTextSplitter from "@/models/TextSplitters/CharacterTextSplitter";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class CharacterTextSplitterNode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  {
    instanceName: LabelledInputControl;
    chunkSize: LabelledInputControl;
    chunkOverlap: LabelledInputControl;
    separator: LabelledInputControl;
    isSeparatorRegex: LabelledInputControl;
    LengthFunction: LabelledInputControl;
  }
> {
  height = 280;

  width = 480;

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
      "separator",
      new LabelledInputControl(
        "separator",
        "\\n\\n",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.characterTextSplitter.setSeparator(str);
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

          await this.characterTextSplitter.setChunkSize(num);
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

          await this.characterTextSplitter.setChunkOverlap(num);
        },
        "number",
      ),
    );

    this.addControl(
      "LengthFunction",
      new LabelledInputControl(
        "length function",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.characterTextSplitter.setLengthFunction(str);
        },
        "text",
      ),
    );
    this.addControl(
      "isSeparatorRegex",
      new LabelledInputControl(
        "is separator regex",
        "False",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.characterTextSplitter.setIsRegexSeparator(str);
        },
        "text",
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
