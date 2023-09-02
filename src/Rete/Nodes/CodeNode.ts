// Controls the view for the Code node

import { ClassicPreset } from "rete";

// Leaf Node. No inputs, only outputs
export default class CodeNode extends ClassicPreset.Node<
  { openAIInput: ClassicPreset.Socket },
  {},
  { temperature: ClassicPreset.InputControl<"number"> }
> {
  height = 200;

  width = 200;

  constructor(
    socket: ClassicPreset.Socket,
    change?: () => void,
    private update?: (control: ClassicPreset.InputControl<"number">) => void,
  ) {
    super("Generated Code");

    const openAIInput = new ClassicPreset.Input(socket, "OpenAIInput");

    openAIInput.addControl(
      new ClassicPreset.InputControl("number", { initial: 0, change }),
    );

    this.addInput("openAIInput", openAIInput);
    this.addControl(
      "temperature",
      new ClassicPreset.InputControl("number", {
        readonly: true,
      }),
    );
  }

  data(inputs: {
    openAIInput?: {
      temperature: number;
    }[];
  }): { value: number } {
    const openAIControl = this.inputs.openAIInput
      ?.control as ClassicPreset.InputControl<"number">;

    const { openAIInput } = inputs;
    const value = openAIInput
      ? openAIInput[0].temperature
      : openAIControl.value || 0;

    this.controls.temperature.setValue(value);

    if (this.update) this.update(this.controls.temperature);

    return { value };
  }
}
