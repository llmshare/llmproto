import { ClassicPreset } from "rete";

import MarkdownHeaderTextSplitter from "@/models/TextSplitters/MarkdownHeaderTextSplitter";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class MarkdownHeaderTextSplitterNode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  {
    instanceName: LabelledInputControl;
    HeadersToSplitOn: LabelledInputControl;
  }
> {
  height = 180;

  width = 450;

  private _markdownHeaderTextSplitter: MarkdownHeaderTextSplitter;

  constructor(
    markdownHeaderTextSplitter: MarkdownHeaderTextSplitter,
    socket: ClassicPreset.Socket,
  ) {
    super("MarkdownHeaderTextSplitter");

    this._markdownHeaderTextSplitter = markdownHeaderTextSplitter;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.markdownHeaderTextSplitter.setInstanceName(str);
        },
        "text",
      ),
    );

    this.addControl(
      "HeadersToSplitOn",
      new LabelledInputControl(
        "headers to split on",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.markdownHeaderTextSplitter.setHeadersToSplitOn(str);
        },
        "text",
      ),
    );

    this.addOutput("output", new ClassicPreset.Output(socket));
  }

  get markdownHeaderTextSplitter(): MarkdownHeaderTextSplitter {
    return this._markdownHeaderTextSplitter;
  }

  set markdownHeaderTextSplitter(value: MarkdownHeaderTextSplitter) {
    this._markdownHeaderTextSplitter = value;
  }
}
