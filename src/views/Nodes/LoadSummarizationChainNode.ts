//  view for the loadSummarizationChain node

import { ClassicPreset } from "rete";

import LoadSummarizationChain from "@/models/Chains/LoadSummarizationChain";
import { CheckboxControl } from "@/views/Components/Checkbox";
import { DropdownControl } from "@/views/Components/Dropdown";
import { LabelledInputControl } from "@/views/Components/LabelledInput";

export default class LoadSummarizationChainNode extends ClassicPreset.Node<
  {},
  {},
  {
    instanceName: LabelledInputControl;
    type: DropdownControl;
    returnIntermediateSteps: CheckboxControl;
  }
> {
  height = 180;

  width = 380;

  private _chain: LoadSummarizationChain;

  constructor(chain: LoadSummarizationChain) {
    super("LoadSummarizationChain");

    this._chain = chain;

    this.addControl(
      "instanceName",
      new LabelledInputControl(
        "instance name",
        "",
        async (value) => {
          const str = String(value);

          if (!str) return;

          await this.chain.setInstanceName(str);
        },
        "text",
      ),
    );

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

    this.addControl(
      "returnIntermediateSteps",
      new CheckboxControl(
        "returnIntermediateSteps",
        this._chain.initialReturnIntermediateSteps,
        async (value) => {
          await chain.setReturnIntermediateSteps(value);
        },
      ),
    );
  }

  get chain(): LoadSummarizationChain {
    return this._chain;
  }
}
