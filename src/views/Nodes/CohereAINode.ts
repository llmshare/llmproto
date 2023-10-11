// View for the CohereAI node

import { ClassicPreset } from "rete";

import CohereAI from "@/models/BaseLLM/CohereAI";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class CohereAINode extends ClassicPreset.Node<
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

  private _cohereAI: CohereAI;

  constructor(cohereAI: CohereAI, socket: ClassicPreset.Socket) {
    super("CohereAI");

    this._cohereAI = cohereAI;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.cohereAI.setInstanceName(str);
        },
        "text",
      ),
    );

    this.addControl(
      "temperature",
      new LabelledInputControl(
        "temperature",
        cohereAI.initialTemperature,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.cohereAI.setTemperature(num);
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

          await this.cohereAI.setBatchSize(num);
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

          await this.cohereAI.setModelName(str);
        },
        "text",
      ),
    );

    this.addOutput("output", new ClassicPreset.Output(socket));
  }

  get cohereAI(): CohereAI {
    return this._cohereAI;
  }

  set cohereAI(value: CohereAI) {
    this._cohereAI = value;
  }
}
