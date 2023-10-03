// View for the OpenAI node

import { ClassicPreset } from "rete";

import OpenAI from "@/models/BaseLLM/OpenAI";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class OpenAINode extends ClassicPreset.Node<
  {},
  { output: ClassicPreset.Socket },
  {
    instanceName: LabelledInputControl;
    temperature: LabelledInputControl;
    batchSize: LabelledInputControl;
    modelName: LabelledInputControl;
  }
> {
  height = 280;

  width = 380;

  private _openAI: OpenAI;

  constructor(openAI: OpenAI, socket: ClassicPreset.Socket) {
    super("OpenAI");

    this._openAI = openAI;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.openAI.setInstanceName(str);
        },
        "text",
      ),
    );

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

    this.addControl(
      "batchSize",
      new LabelledInputControl(
        "batch size",
        0,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.openAI.setBatchSize(num);
        },
        "number",
      ),
    );

    this.addControl(
      "modelName",
      new LabelledInputControl(
        "model name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.openAI.setModelName(str);
        },
        "text",
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
