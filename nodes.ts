// Import necessary classes 
// Import rete.js library
import Rete from 'rete';

// Import langchain framework
import langchain from 'langchain';
import { ConnectionPlugin, Presets as ConnectionPresets } from "rete-connection-plugin"
import { AreaExtensions } from "rete-area-plugin";
import { createRoot } from "react-dom/client";
import { AreaPlugin } from "rete-area-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";

import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
const editor = new NodeEditor<Schemes>();

const socket = new ClassicPreset.Socket("socket");
const nodeA = new ClassicPreset.Node("A");
nodeA.addControl("a", new ClassicPreset.InputControl("text", {}));
nodeA.addOutput("a", new ClassicPreset.Output(socket));
await editor.addNode(nodeA);


type AreaExtra = ReactArea2D<Schemes>;
const area = new AreaPlugin<Schemes, AreaExtra>(container);
const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
render.addPreset(Presets.classic.setup());
editor.use(area);
area.use(render);

const nodeB = new ClassicPreset.Node("B");
nodeB.addControl("b", new ClassicPreset.InputControl("text", {}));
nodeB.addInput("b", new ClassicPreset.Input(socket));
await editor.addNode(nodeB);

await editor.addConnection(new ClassicPreset.Connection(nodeA, "a", nodeB, "b"));

await area.translate(nodeB.id, { x: 270, y: 0 });


const connection = new ConnectionPlugin<Schemes, AreaExtra>();
connection.addPreset(ConnectionPresets.classic.setup())
area.use(connection);

AreaExtensions.zoomAt(area, editor.getNodes());

AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
  accumulating: AreaExtensions.accumulateOnCtrl()
});

AreaExtensions.simpleNodesOrder(area);

