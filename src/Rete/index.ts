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

import CodeNode from "@/Models/CodeNode/CodeNode";
import OpenAINode from "@/Models/OpenAI/OpenAI";

class Connection<
  A extends Node,
  B extends Node,
> extends ClassicPreset.Connection<A, B> {}

type Node = OpenAINode | CodeNode;
type ConnectionProps =
  | Connection<OpenAINode, CodeNode>
  | Connection<CodeNode, CodeNode>;
type Schemes = GetSchemes<Node, ConnectionProps>;

type AreaExtra = ReactArea2D<any>;

export default async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket("socket");

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  const arrange = new AutoArrangePlugin<Schemes>();
  const engine = new DataflowEngine<Schemes>();

  // function syncs up the data between the nodes
  function process() {
    engine.reset();

    editor
      .getNodes()
      .filter((node) => node instanceof CodeNode)
      .forEach((node) => engine.fetch(node.id));
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

  const openAINode = new OpenAINode(socket, 0, process);
  const codeNode = new CodeNode(socket, process, (val) =>
    area.update("control", val.id),
  );

  const openAIConnection = new Connection(
    openAINode,
    "value",
    codeNode,
    "openAIInput",
  );

  await editor.addNode(openAINode);
  await editor.addNode(codeNode);

  await editor.addConnection(openAIConnection);

  await arrange.layout();
  await AreaExtensions.zoomAt(area, editor.getNodes());

  return {
    destroy: () => area.destroy(),
  };
}
