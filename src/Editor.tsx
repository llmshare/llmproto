import { createRoot } from "react-dom/client";
import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = ReactArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket("socket");

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  render.addPreset(Presets.classic.setup());

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  AreaExtensions.simpleNodesOrder(area);

  const a = new ClassicPreset.Node("A");
  a.addControl("a", new ClassicPreset.InputControl("text", { initial: "a" }));
  a.addOutput("a", new ClassicPreset.Output(socket));
  a.addOutput("a1", new ClassicPreset.Output(socket));
  await editor.addNode(a);

  const a1 = new ClassicPreset.Node("A1");
  a1.addControl(
    "a1",
    new ClassicPreset.InputControl("text", { initial: "a1" })
  );
  a1.addInput("a1", new ClassicPreset.Input(socket));
  await editor.addNode(a1);
  await editor.addConnection(new ClassicPreset.Connection(a, "a1", a1, "a1"));

  const b = new ClassicPreset.Node("B");
  b.addControl("b", new ClassicPreset.InputControl("text", { initial: "b" }));
  b.addInput("b", new ClassicPreset.Input(socket));
  b.addOutput("b", new ClassicPreset.Output(socket));
  b.addOutput("b1", new ClassicPreset.Output(socket));
  await editor.addNode(b);

  const b1 = new ClassicPreset.Node("B1");
  b1.addControl(
    "b1",
    new ClassicPreset.InputControl("text", { initial: "b1" })
  );
  b1.addInput("b1", new ClassicPreset.Input(socket));
  await editor.addNode(b1);
  await editor.addConnection(new ClassicPreset.Connection(b, "b1", b1, "b1"));

  const c = new ClassicPreset.Node("C");
  c.addControl("c", new ClassicPreset.InputControl("text", { initial: "c" }));
  c.addInput("c", new ClassicPreset.Input(socket));
  c.addOutput("c", new ClassicPreset.Output(socket));
  c.addOutput("c1", new ClassicPreset.Output(socket));
  await editor.addNode(c);

  const c1 = new ClassicPreset.Node("c1");
  c1.addControl(
    "c1",
    new ClassicPreset.InputControl("text", { initial: "c1" })
  );
  c1.addInput("c1", new ClassicPreset.Input(socket));
  await editor.addNode(c1);
  await editor.addConnection(new ClassicPreset.Connection(c, "c1", c1, "c1"));

  const d = new ClassicPreset.Node("D");
  d.addControl("d", new ClassicPreset.InputControl("text", { initial: "d" }));
  d.addInput("d", new ClassicPreset.Input(socket));
  d.addOutput("d", new ClassicPreset.Output(socket));
  d.addOutput("d1", new ClassicPreset.Output(socket));
  await editor.addNode(d);

  const d1 = new ClassicPreset.Node("d1");
  d1.addControl(
    "d1",
    new ClassicPreset.InputControl("text", { initial: "d1" })
  );
  d1.addInput("d1", new ClassicPreset.Input(socket));
  await editor.addNode(d1);
  await editor.addConnection(new ClassicPreset.Connection(d, "d1", d1, "d1"));

  await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "b"));
  await editor.addConnection(new ClassicPreset.Connection(b, "b", c, "c"));
  await editor.addConnection(new ClassicPreset.Connection(c, "c", d, "d"));

  await area.translate(a.id, { x: -450, y: 0 });
  await area.translate(b.id, { x: -150, y: 0 });
  await area.translate(c.id, { x: 200, y: 0 });
  await area.translate(d.id, { x: 500, y: 0 });
  await area.translate(a1.id, { x: -275, y: 250 });
  await area.translate(b1.id, { x: 25, y: 250 });
  await area.translate(c1.id, { x: 325, y: 250 });
  await area.translate(d1.id, { x: 575, y: 250 });

  setTimeout(() => {
    // wait until nodes rendered because they dont have predefined width and height
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 10);
  return {
    destroy: () => area.destroy()
  };
}
