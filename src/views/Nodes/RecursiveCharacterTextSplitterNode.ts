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
    isSeparatorRegex: LabelledInputControl;
    LengthFunction: LabelledInputControl;
    separators: LabelledInputControl;
  }
> {
  height = 280;

  width = 480;

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
      "separators",
      new LabelledInputControl(
        "separators",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.recursiveCharacterTextSplitter.setSeparators(str);
        },
        "text",
      ),
    );

    this.addControl(
      "chunkSize",
      new LabelledInputControl(
        "chunk size",
        100,
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
        20,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.recursiveCharacterTextSplitter.setChunkOverlap(num);
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

          await this.recursiveCharacterTextSplitter.setLengthFunction(str);
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

          await this.recursiveCharacterTextSplitter.setIsRegexSeparator(str);
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

// text_splitter = RecursiveCharacterTextSplitter(
//   chunk_size=800, X
//   separators=["\n\n", "\n", ".", "!", "?", ",", " ", ""], MM
//   chunk_overlap=20, X
// )

// text_splitter = RecursiveCharacterTextSplitter(
//   chunk_size=1500, chunk_overlap=100,
// add_start_index=True MM
// )
