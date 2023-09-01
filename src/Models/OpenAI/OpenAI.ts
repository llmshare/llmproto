import { ClassicPreset } from "rete";

export default class OpenAINode extends ClassicPreset.Node<
  {},
  { value: ClassicPreset.Socket },
  { temperature: ClassicPreset.InputControl<"number"> }
> {
  height = 120;

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
        change,
      }),
    );
    this.addOutput("value", new ClassicPreset.Output(socket, "OpenAIOutput"));
  }

  data() {
    return {
      value: { temperature: this.controls.temperature.value || 0 },
    };
  }
}
