// View for the OpenAI node

import { ClassicPreset } from "rete";

import OpenAI from "@/models/BaseLLM/OpenAI";

export default class OpenAINode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  { temperature: ClassicPreset.InputControl<"number"> }
> {
  height = 180;

  width = 180;

  private _openAI: OpenAI;

  constructor(openAI: OpenAI, socket: ClassicPreset.Socket) {
    super("OpenAI");

    this._openAI = openAI;

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

    this.addOutput("output", new ClassicPreset.Output(socket, "Output"));
  }

  get openAI(): OpenAI {
    return this._openAI;
  }

  set openAI(value: OpenAI) {
    this._openAI = value;
  }
}
