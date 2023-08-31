import { ClassicPreset } from "rete";

import { DecimalControl } from "@/rete/Components/DecimalInput";

// Custom Node
export default class AppNode extends ClassicPreset.Node<
  { [key in string]: ClassicPreset.Socket },
  { [key in string]: ClassicPreset.Socket },
  {
    [key in string]:
      | DecimalControl
      | ClassicPreset.Control
      | ClassicPreset.InputControl<"number">
      | ClassicPreset.InputControl<"text">;
  }
> {}
