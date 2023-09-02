// Controls the view for the Code node

import { ClassicPreset } from "rete";
import { InputControl } from "rete/_types/presets/classic";

import Code from "@/Models/Code/Code";
import { ButtonControl } from "@/Rete/Components/Button";

export default class CodeNode extends ClassicPreset.Node<
  {},
  {},
  { generate: ButtonControl; code: InputControl<"text"> }
> {
  height = 200;

  width = 200;

  private _code: Code;

  constructor(
    socket: ClassicPreset.Socket,
    code: Code,
    private update: (control: InputControl<"text">) => void,
  ) {
    super("Generated Code");

    this._code = code;

    this.addControl(
      "code",
      new ClassicPreset.InputControl("text", {
        initial: "",
        readonly: true,
      }),
    );
    this.addControl(
      "generate",
      new ButtonControl("Generate", () => {
        this.controls.code.setValue(this._code.generate());

        update(this.controls.code);
      }),
    );
  }

  //   Getters and Setters
  //   Code
  get code(): Code {
    return this._code;
  }

  set code(value: Code) {
    this._code = value;
  }
}
