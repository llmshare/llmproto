import { createRoot } from "react-dom/client";
import { ClassicPreset, GetSchemes, NodeEditor } from "rete";
import { AreaExtensions, AreaPlugin } from "rete-area-plugin";
import { ConnectionPlugin } from "rete-connection-plugin";
import { Presets, ReactArea2D, ReactPlugin } from "rete-react-plugin";

import OpenAINode from "@/Models/OpenAI/OpenAI";
import AppNode from "@/rete/BaseConfig/AppNode";
import DecimalInput, { DecimalControl } from "@/rete/Components/DecimalInput";

class Connection<
  A extends AppNode,
  B extends AppNode,
> extends ClassicPreset.Connection<A, B> {}

type Schemes = GetSchemes<AppNode, Connection<AppNode, AppNode>>;
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
   * responsible for user interaction with nodes
   */
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();

  /**
   * responsible for rendering nodes in React
   */
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  // add custom render presets
  render.addPreset(
    Presets.classic.setup({
      customize: {
        control(data) {
          if (data.payload instanceof DecimalControl) {
            return DecimalInput;
          }
          if (data.payload instanceof ClassicPreset.InputControl) {
            return Presets.classic.Control;
          }
          return null;
        },
      },
    }),
  );
  // connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  const openAiNode = new OpenAINode(socket);

  await editor.addNode(openAiNode);

  await AreaExtensions.zoomAt(area, editor.getNodes());

  return {
    destroy: () => area.destroy(),
  };
}

export { AppNode, Connection };
