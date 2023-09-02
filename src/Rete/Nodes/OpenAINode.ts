// Controls the view for the OpenAI node

import { ClassicPreset } from "rete";

import OpenAI from "@/Models/OpenAI/OpenAI";

export default class OpenAINode extends ClassicPreset.Node<
  {},
  {},
  { temperature: ClassicPreset.InputControl<"number"> }
> {
  height = 180;

  width = 180;

  private _openAI: OpenAI;

  constructor(socket: ClassicPreset.Socket, openAI: OpenAI) {
    super("OpenAI");

    this._openAI = openAI;

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
        },
      }),
    );
    // this.addOutput("value", new ClassicPreset.Output(socket, "OpenAIOutput"));
  }

  get openAI(): OpenAI {
    return this._openAI;
  }

  set openAI(value: OpenAI) {
    this._openAI = value;
  }
}
