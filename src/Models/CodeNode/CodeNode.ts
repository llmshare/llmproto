import { ClassicPreset } from "rete";
import { DataflowNode } from "rete-engine";

import { DecimalControl } from "@/Rete/Components/DecimalInput";

export default class CodeNode
  extends ClassicPreset.Node<
    { openAI: ClassicPreset.Socket },
    { code: ClassicPreset.Socket },
    { code: DecimalControl }
  >
  implements DataflowNode
{
  width = 200;

  height = 200;

  constructor(
    socket: ClassicPreset.Socket,
    change?: () => void,
    private update?: (control: number) => void,
  ) {
    super("Generated Code");

    const openAI = new ClassicPreset.Input(socket, "temperature");
    openAI.addControl(
      new DecimalControl("Temperature", (val) => {
        console.log(val);
      }),
    );

    this.addInput("openAI", openAI);
    this.addOutput("code", new ClassicPreset.Output(socket, "Code"));

    console.log({ openAI });
    console.log({ input: this.inputs });
  }

  // eslint-disable-next-line class-methods-use-this
  data(inputs: { openAI?: { temperature: number }[] }) {
    console.log({ inputs });

    const { openAI } = inputs;
    let value = 0;
    if (openAI) {
      value = openAI[0]?.temperature || 0;
    }

    console.log("Input openAI", this.inputs.openAI);

    const control = this.inputs.openAI?.control as DecimalControl;
    control?.setValue(value);

    if (this.update) {
      this.update(this.controls.code.value);

      console.log("Updated control", control);
    }

    return { code: value };
  }
}
