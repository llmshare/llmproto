// View for the OpenAI node

import { ClassicPreset } from "rete";

import RecursiveCharacterTextSplitter from "@/models/TextSplitters/RecursiveCharacterTextSplitter";

export default class RecursiveCharacterTextSplitterNode extends ClassicPreset.Node<
  {},
  {},
  { chunkSize: ClassicPreset.InputControl<"number"> }
> {
  height = 180;

  width = 280;

  private _recursiveCharacterTextSplitter: RecursiveCharacterTextSplitter;

  constructor(recursiveCharacterTextSplitter: RecursiveCharacterTextSplitter) {
    super("RecursiveCharacterTextSplitter");

    this._recursiveCharacterTextSplitter = recursiveCharacterTextSplitter;

    this.addControl(
      "chunkSize",
      new ClassicPreset.InputControl("number", {
        initial: 1000,
        change: async (value: number) => {
          if (value < 0) {
            this.controls.chunkSize.setValue(0);
            return;
          }

          await this.recursiveCharacterTextSplitter.setRecursiveCharacterTextSplitter(
            value,
          );
        },
      }),
    );
  }

  get recursiveCharacterTextSplitter(): RecursiveCharacterTextSplitter {
    return this._recursiveCharacterTextSplitter;
  }

  set recursiveCharacterTextSplitter(value: RecursiveCharacterTextSplitter) {
    this._recursiveCharacterTextSplitter = value;
  }
}
