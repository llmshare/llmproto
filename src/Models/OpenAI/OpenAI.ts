import { ClassicPreset } from "rete";

import AppNode from "@/rete/BaseConfig/AppNode";
import { DecimalControl } from "@/rete/Components/DecimalInput";

/**
 * OpenAI Model
 * will also implement dataflow node (to pass data to the generated code)
 */
export default class OpenAINode extends AppNode {
  constructor(socket: ClassicPreset.Socket) {
    super("OpenAI");

    this.addOutput("OpenAI", new ClassicPreset.Output(socket));
    this.addControl(
      "temperature",
      new DecimalControl("Temperature", (e) => {
        console.log(e.target.value);
      }),
    );
  }
}
