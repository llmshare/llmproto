import { ClassicPreset } from "rete";

import RecursivelanguageCharacterTextSplitter from "@/models/TextSplitters/RecursivelanguageCharacterTextSplitter";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class RecursivelanguageCharacterTextSplitterNode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  {
    instanceName: LabelledInputControl;
    chunkSize: LabelledInputControl;
    chunkOverlap: LabelledInputControl;
    language: LabelledInputControl;
  }
> {
  height = 280;

  width = 480;

  private _recursivelanguageCharacterTextSplitter: RecursivelanguageCharacterTextSplitter;

  constructor(
    recursivelanguageCharacterTextSplitter: RecursivelanguageCharacterTextSplitter,
    socket: ClassicPreset.Socket,
  ) {
    super("RecursivelanguageCharacterTextSplitter");

    this._recursivelanguageCharacterTextSplitter =
      recursivelanguageCharacterTextSplitter;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.RecursivelanguageCharacterTextSplitter.setInstanceName(
            str,
          );
        },
        "text",
      ),
    );

    this.addControl(
      "language",
      new LabelledInputControl(
        "language",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.RecursivelanguageCharacterTextSplitter.setLanguage(str);
        },
        "text",
      ),
    );

    this.addControl(
      "chunkSize",
      new LabelledInputControl(
        "chunk size",
        50,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.RecursivelanguageCharacterTextSplitter.setChunkSize(num);
        },
        "number",
      ),
    );

    this.addControl(
      "chunkOverlap",
      new LabelledInputControl(
        "chunk overlap",
        10,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.RecursivelanguageCharacterTextSplitter.setChunkOverlap(
            num,
          );
        },
        "number",
      ),
    );
    this.addOutput("output", new ClassicPreset.Output(socket));
  }

  get RecursivelanguageCharacterTextSplitter(): RecursivelanguageCharacterTextSplitter {
    return this._recursivelanguageCharacterTextSplitter;
  }

  set RecursivelanguageCharacterTextSplitter(
    value: RecursivelanguageCharacterTextSplitter,
  ) {
    this._recursivelanguageCharacterTextSplitter = value;
  }
}
