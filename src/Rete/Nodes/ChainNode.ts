// Controls the view for the Chain node

import { ClassicPreset } from "rete";

import Chain from "@/models/Chain/Chain";
import { DropdownControl } from "@/Rete/Components/Dropdown";

export default class ChainNode extends ClassicPreset.Node<
  {},
  {},
  { type: DropdownControl }
> {
  height = 200;

  width = 200;

  private _chain: Chain;

  constructor(chain: Chain) {
    super("Chain");

    this._chain = chain;

    this.addControl(
      "type",
      new DropdownControl(
        "type",
        ["map_reduce", "refine", "stuff"],
        this._chain.initialType,
        async (value) => {
          await chain.setType(value);
        },
      ),
    );
  }
}
