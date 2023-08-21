import { createRoot } from "react-dom/client";
import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import {
  AutoArrangePlugin,
  Presets as ArrangePresets,
  ArrangeAppliers
} from "rete-auto-arrange-plugin";
import {
  ContextMenuPlugin,
  Presets as ContextMenuPresets,
  ContextMenuExtra
} from "rete-context-menu-plugin";
import { easeInOut } from "popmotion";
import { insertableNodes } from "./insert-node";

const socket = new ClassicPreset.Socket("socket");

class Node extends ClassicPreset.Node {
  width = 180;
  height = 120;

  constructor() {
    super("Node");

    this.addInput("port", new ClassicPreset.Input(socket));
    this.addOutput("port", new ClassicPreset.Output(socket));
  }
}
class Connection<N extends Node> extends ClassicPreset.Connection<N, N> {}

type Schemes = GetSchemes<Node, Connection<Node>>;
type AreaExtra = ReactArea2D<Schemes> | ContextMenuExtra;

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  const arrange = new AutoArrangePlugin<Schemes>();
  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([["Node", () => new Node()]])
  });
  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  render.addPreset(Presets.classic.setup());
  render.addPreset(Presets.contextMenu.setup());

  connection.addPreset(ConnectionPresets.classic.setup());

  arrange.addPreset(ArrangePresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);
  area.use(arrange);
  area.use(contextMenu);

  const animatedApplier = new ArrangeAppliers.TransitionApplier<Schemes, never>(
    {
      duration: 500,
      timingFunction: easeInOut
    }
  );

  AreaExtensions.simpleNodesOrder(area);

  insertableNodes(area, {
    async createConnections(node, connection) {
      await editor.addConnection(
        new Connection(
          editor.getNode(connection.source),
          connection.sourceOutput,
          node,
          "port"
        )
      );
      await editor.addConnection(
        new Connection(
          node,
          "port",
          editor.getNode(connection.target),
          connection.targetInput
        )
      );
      arrange.layout({
        applier: animatedApplier
      });
    }
  });

  const a = new Node();
  const b = new Node();
  const c = new Node();
  const d = new Node();

  await editor.addNode(a);
  await editor.addNode(b);
  await editor.addNode(c);
  await editor.addNode(d);

  await editor.addConnection(new Connection(a, "port", b, "port"));
  await editor.addConnection(new Connection(b, "port", c, "port"));

  await arrange.layout();
  AreaExtensions.zoomAt(area, editor.getNodes());
  return {
    destroy: () => area.destroy()
  };
}
