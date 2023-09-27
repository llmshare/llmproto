// View for the OpenAI node

import { ClassicPreset } from "rete";

import OpenAI from "@/models/BaseLLM/OpenAI";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class OpenAINode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  { temperature: LabelledInputControl }
> {
  height = 180;

  width = 280;

  private _openAI: OpenAI;

  constructor(openAI: OpenAI, socket: ClassicPreset.Socket) {
    super("OpenAI");

    this._openAI = openAI;

    this.addControl(
      "temperature",
      new LabelledInputControl(
        "temperature",
        openAI.initialTemperature,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.openAI.setTemperature(num);
        },
        "number",
      ),
    );

    this.addOutput("output", new ClassicPreset.Output(socket));
  }

  get openAI(): OpenAI {
    return this._openAI;
  }

  set openAI(value: OpenAI) {
    this._openAI = value;
  }
}
