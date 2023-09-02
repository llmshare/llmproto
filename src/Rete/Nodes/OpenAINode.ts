// Controls the view for the OpenAI node

import { ClassicPreset } from "rete";

import OpenAI from "@/Models/OpenAI";

// Root node. No inputs, only outputs
export default class OpenAINode extends ClassicPreset.Node<
  {},
  { value: ClassicPreset.Socket },
  { temperature: ClassicPreset.InputControl<"number"> }
> {
  height = 180;

  width = 180;

  private _openAI: OpenAI;

  constructor(
    socket: ClassicPreset.Socket,
    temperature: number,
    change?: () => void,
  ) {
    super("OpenAI");

    this._openAI = new OpenAI(temperature);

    this.addControl(
      "temperature",
      new ClassicPreset.InputControl("number", {
        initial: this._openAI.temperature,
        change: (value: number) => {
          if (value < 0) {
            this.controls.temperature.setValue(0);
            return;
          }

          this._openAI.temperature = value;
          console.log({ openAI: this._openAI });
          if (change) change(); // forces UI update
        },
      }),
    );
    this.addOutput("value", new ClassicPreset.Output(socket, "OpenAIOutput"));
  }

  get openAI(): OpenAI {
    return this._openAI;
  }

  set openAI(value: OpenAI) {
    this._openAI = value;
  }

  data() {
    return {
      value: { temperature: this._openAI.temperature || 0 },
    };
  }
}
