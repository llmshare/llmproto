// Controls the view for the OpenAI node

import { ClassicPreset } from "rete";

import OpenAI from "@/Models/OpenAI";

export default class OpenAINode extends ClassicPreset.Node<
  {},
  { value: ClassicPreset.Socket },
  { temperature: ClassicPreset.InputControl<"number"> }
> {
  height = 120;

  openAI = new OpenAI();

  width = 180;

  constructor(
    socket: ClassicPreset.Socket,
    temperature: number,
    change?: () => void,
  ) {
    super("OpenAI");

    this.addControl(
      "temperature",
      new ClassicPreset.InputControl("number", {
        initial: temperature,
        change: (value: number) => {
          this.openAI.temperature = value;
          console.log(this.openAI);
          if (change) change(); // forces UI update
        },
      }),
    );
    this.addOutput("value", new ClassicPreset.Output(socket, "OpenAIOutput"));
  }

  data() {
    return {
      value: { temperature: this.openAI.temperature || 0 },
    };
  }
}
