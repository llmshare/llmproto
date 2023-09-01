import { ClassicPreset } from "rete";

export default class CodeNode extends ClassicPreset.Node<
  { openAIInput: ClassicPreset.Socket },
  { value: ClassicPreset.Socket },
  { value: ClassicPreset.InputControl<"number"> }
> {
  height = 190;

  width = 180;

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
      "value",
      new ClassicPreset.InputControl("number", {
        readonly: true,
      }),
    );
    this.addOutput("value", new ClassicPreset.Output(socket, "Number"));
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
    // const value = 0;

    this.controls.value.setValue(value);

    if (this.update) this.update(this.controls.value);

    return { value };
  }
}
