//  view for the loadSummarizationChain node

// export const loadSummarizationChain = (
//  llm: BaseLanguageModel,
//  params: SummarizationChainParams = { type: "map_reduce" }
// )

import { ClassicPreset } from "rete";

import LoadSummarizationChain from "@/models/Chains/LoadSummarizationChain";
import { DropdownControl } from "@/views/Components/Dropdown";

export default class LoadSummarizationChainNode extends ClassicPreset.Node<
  {},
  {},
  { type: DropdownControl }
> {
  height = 200;

  width = 200;

  private _chain: LoadSummarizationChain;

  constructor(chain: LoadSummarizationChain) {
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
