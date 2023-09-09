// Controls the view for the OpenAI node

import { ClassicPreset } from "rete";

import OpenAI from "@/models/TextSplitters/RecursiveCharacterTextSplitter";

export default class RecursizeCharacterTextSplitterNode extends ClassicPreset.Node<
  {},
  {},
  { temperature: ClassicPreset.InputControl<"number"> }
> {
  height = 180;

  width = 180;

  private _TextSplitter: OpenAI;

  constructor(openAI: OpenAI) {
    super("OpenAI");

    this._TextSplitter = openAI;

    console.log({ initialTemperature: this._TextSplitter.initialTemperature });

    this.addControl(
      "temperature",
      new ClassicPreset.InputControl("number", {
        initial: this.openAI.initialTemperature,
        change: async (value: number) => {
          if (value < 0) {
            this.controls.temperature.setValue(0);
            return;
          }

          await this.openAI.setTemperature(value);
        },
      }),
    );
  }

  get openAI(): OpenAI {
    return this._TextSplitter;
  }

  set openAI(value: OpenAI) {
    this._TextSplitter = value;
  }
}
