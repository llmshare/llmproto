import { createRoot } from "react-dom/client";
import { ClassicPreset, GetSchemes, NodeEditor } from "rete";
import { AreaExtensions, AreaPlugin } from "rete-area-plugin";
import {
  AutoArrangePlugin,
  Presets as ArrangePresets,
} from "rete-auto-arrange-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { DataflowEngine } from "rete-engine";
import { Presets, ReactArea2D, ReactPlugin } from "rete-react-plugin";

const socket = new ClassicPreset.Socket("socket");

class OpenAINode extends ClassicPreset.Node<
  {},
  { value: ClassicPreset.Socket },
  { temperature: ClassicPreset.InputControl<"number"> }
> {
  height = 120;

  width = 180;

  constructor(temperature: number, change?: () => void) {
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

class CodeNode extends ClassicPreset.Node<
  { openAIInput: ClassicPreset.Socket },
  { value: ClassicPreset.Socket },
  { value: ClassicPreset.InputControl<"number"> }
> {
  height = 190;

  width = 180;

  constructor(
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

class Connection<
  A extends Node,
  B extends Node,
> extends ClassicPreset.Connection<A, B> {}

type Node = OpenAINode | CodeNode;
type ConnProps =
  | Connection<OpenAINode, CodeNode>
  | Connection<CodeNode, CodeNode>;
type Schemes = GetSchemes<Node, ConnProps>;

type AreaExtra = ReactArea2D<any>;

export default async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  const arrange = new AutoArrangePlugin<Schemes>();
  const engine = new DataflowEngine<Schemes>();

  function process() {
    engine.reset();

    editor
      .getNodes()
      .filter((n) => n instanceof CodeNode)
      .forEach((n) => engine.fetch(n.id));
  }

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  render.addPreset(Presets.classic.setup());

  connection.addPreset(ConnectionPresets.classic.setup());

  arrange.addPreset(ArrangePresets.classic.setup());

  editor.use(engine);
  editor.use(area);
  area.use(connection);
  area.use(render);
  area.use(arrange);

  AreaExtensions.simpleNodesOrder(area);
  AreaExtensions.showInputControl(area);

  editor.addPipe((context) => {
    if (["connectioncreated", "connectionremoved"].includes(context.type)) {
      process();
    }
    return context;
  });

  const openAINode = new OpenAINode(1, process);
  const c = new CodeNode(process, (val) => area.update("control", val.id));

  const con2 = new Connection(openAINode, "value", c, "openAIInput");

  await editor.addNode(openAINode);
  await editor.addNode(c);

  await editor.addConnection(con2);

  await arrange.layout();
  await AreaExtensions.zoomAt(area, editor.getNodes());

  return {
    destroy: () => area.destroy(),
  };
}
