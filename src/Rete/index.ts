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
import DecimalInput from "@/Rete/Components/DecimalInput";

type Node = OpenAINode | CodeNode;
type InputNode = OpenAINode;

class Connection<
  A extends Node,
  B extends Node,
> extends ClassicPreset.Connection<A, B> {}

type Schemes = GetSchemes<Node, Connection<InputNode, CodeNode>>;
type AreaExtra = ReactArea2D<any>;

export default async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket("socket");

  /**
   * core of the editor. Responsible for managing nodes and connections
   */
  const editor = new NodeEditor<Schemes>();

  /**
   * responsible for displaying the viewport where we can interact with the nodes. does not handle rendering
   * of nodes itself
   */
  const area = new AreaPlugin<Schemes, AreaExtra>(container);

  /**
   * responsible for user interaction with nodes.
   * Note required in Read-only apps
   */
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();

  /**
   * responsible for rendering nodes in React
   */
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  /**
   * add custom render presets
   */
  render.addPreset(
    Presets.classic.setup({
      customize: {
        control() {
          // if (data.payload instanceof DecimalControl) {
          return DecimalInput;
          // }
          // if (data.payload instanceof ClassicPreset.InputControl) {
          //   return Presets.classic.Control;
          // }
          // return null;
        },
      },
    }),
  );
  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  // add engine for dataflow
  const engine = new DataflowEngine<Schemes>();
  editor.use(engine);

  function process() {
    engine.reset();

    editor
      .getNodes()
      .filter((n) => n instanceof CodeNode)
      .forEach((n) => engine.fetch(n.id));
  }

  const openAiNode = new OpenAINode(socket, process);
  const codeNode = new CodeNode(socket);

  const openAIConnection = new Connection(
    openAiNode,
    "openAI",
    codeNode,
    "openAI",
  );

  await editor.addNode(openAiNode);
  await editor.addNode(codeNode);

  await editor.addConnection(openAIConnection);

  await engine.fetch(codeNode.id);

  const arrange = new AutoArrangePlugin<Schemes>();
  arrange.addPreset(ArrangePresets.classic.setup());
  area.use(arrange);
  await arrange.layout();

  await AreaExtensions.zoomAt(area, editor.getNodes());

  return {
    destroy: () => area.destroy(),
  };
}
