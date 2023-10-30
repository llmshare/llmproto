import { ClassicPreset } from "rete";

import HTMLHeaderTextSplitter from "@/models/TextSplitters/HTMLHeaderTextSplitter";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class HTMLHeaderTextSplitterNode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  {
    instanceName: LabelledInputControl;
    HeadersToSplitOn: LabelledInputControl;
  }
> {
  height = 180;

  width = 450;

  private _markdownHeaderTextSplitter: HTMLHeaderTextSplitter;

  constructor(
    htmlHeaderTextSplitter: HTMLHeaderTextSplitter,
    socket: ClassicPreset.Socket,
  ) {
    super("HTMLHeaderTextSplitter");

    this._markdownHeaderTextSplitter = htmlHeaderTextSplitter;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.htmlHeaderTextSplitter.setInstanceName(str);
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

          await this.htmlHeaderTextSplitter.setHeadersToSplitOn(str);
        },
        "text",
      ),
    );

    this.addOutput("output", new ClassicPreset.Output(socket));
  }

  get htmlHeaderTextSplitter(): HTMLHeaderTextSplitter {
    return this._markdownHeaderTextSplitter;
  }

  set htmlHeaderTextSplitter(value: HTMLHeaderTextSplitter) {
    this._markdownHeaderTextSplitter = value;
  }
}
