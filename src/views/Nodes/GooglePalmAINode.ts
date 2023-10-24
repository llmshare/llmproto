// View for the GooglePalmAI node

import { ClassicPreset } from "rete";

import GooglePalmAI from "@/models/BaseLLM/GooglePalmAI";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class GooglePalmAINode extends ClassicPreset.Node<
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

  private _googlepalmAI: GooglePalmAI;

  constructor(googlepalmAI: GooglePalmAI, socket: ClassicPreset.Socket) {
    super("GooglePalmAI");

    this._googlepalmAI = googlepalmAI;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.googlepalmAI.setInstanceName(str);
        },
        "text",
      ),
    );

    this.addControl(
      "temperature",
      new LabelledInputControl(
        "temperature",
        googlepalmAI.initialTemperature,
        async (value) => {
          const num = Number(value);

          if (num < 0) return;

          await this.googlepalmAI.setTemperature(num);
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

          await this.googlepalmAI.setBatchSize(num);
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

          await this.googlepalmAI.setModelName(str);
        },
        "text",
      ),
    );

    this.addOutput("output", new ClassicPreset.Output(socket));
  }

  get googlepalmAI(): GooglePalmAI {
    return this._googlepalmAI;
  }

  set googlepalmAI(value: GooglePalmAI) {
    this._googlepalmAI = value;
  }
}
