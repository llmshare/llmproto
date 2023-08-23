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
const socket = new ClassicPreset.Socket("socket");
class TextNode extends ClassicPreset.Node {
  constructor(public value: string,public value2: string) {
    super(value);
    this.addOutput("value", new ClassicPreset.Output(socket, value));
  }
}
export async function createEditor(container: HTMLElement) {
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
  const a = new TextNode("A");
  await editor.addNode(a);
  a.addControl(
    "a1",
    new ClassicPreset.InputControl("text", { initial: "a1" })
  );
  
  const b = new TextNode("B");
  await editor.addNode(b);
  b.addControl(
    "b1",
    new ClassicPreset.InputControl("text", { initial: "a1" })
  );
  const c = new TextNode("C");
  await editor.addNode(c);
  c.addControl(
    "c1",
    new ClassicPreset.InputControl("text", { initial: "c1" })
  );
  const d = new TextNode("D");
  await editor.addNode(d);
  d.addControl(
    "d1",
    new ClassicPreset.InputControl("text", { initial: "d1" })
  );
  const e = new TextNode("E");
  await editor.addNode(e);
  e.addControl(
    "e1",
    new ClassicPreset.InputControl("text", { initial: "e1" })
  );
  const f = new TextNode("f");
  await editor.addNode(f);
  f.addControl(
    "f1",
    new ClassicPreset.InputControl("text", { initial: "f1" })
  );
  const g = new TextNode("g");
  await editor.addNode(g);
  g.addControl(
    "g1",
    new ClassicPreset.InputControl("text", { initial: "g1" })
  );

  // // await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "b"));
  // await editor.addConnection(new ClassicPreset.Connection(b, "b", c, "c"));
  // await editor.addConnection(new ClassicPreset.Connection(c, "c", d, "d"));
  // await editor.addConnection(new ClassicPreset.Connection(d, "d", e, "e"));
  // await editor.addConnection(new ClassicPreset.Connection(e, "e", f, "f"));

  // // await area.translate(a.id, { x: -450, y: 0 });
  // await area.translate(b.id, { x: -150, y: 0 });
  // await area.translate(c.id, { x: 200, y: 0 });
  // await area.translate(d.id, { x: 500, y: 0 });

  setTimeout(() => {
    // wait until nodes rendered because they dont have predefined width and height
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 10);
  return {
    destroy: () => area.destroy()
  };
}
