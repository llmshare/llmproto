import React from "react";
import { ClassicPreset } from "rete";
import { DataflowNode } from "rete-engine";

import { DecimalControl } from "@/Rete/Components/DecimalInput";

/**
 * OpenAI Model
 */
export default class OpenAINode
  extends ClassicPreset.Node<
    {},
    { openAI: ClassicPreset.Socket },
    { temperature: DecimalControl }
  >
  implements DataflowNode
{
  width = 200;

  height = 200;

  private temperature: number;

  constructor(socket: ClassicPreset.Socket, process: () => void) {
    super("OpenAI");

    this.temperature = 0;

    this.addOutput("openAI", new ClassicPreset.Output(socket));
    this.addControl(
      "temperature",
      new DecimalControl("Temperature", (e) => {
        let value: number | React.ChangeEvent<HTMLInputElement>;

        if (typeof e === "number") value = e;
        else value = +e.target.value;

        if (!value || value < 0) return;

        this.temperature = +value;
        console.log({ temperature: this.temperature });
        process();
      }),
    );

    console.log({ this: this });
  }

  data(): { openAI: { temperature: number } } {
    return { openAI: { temperature: this.temperature } };
  }
}
