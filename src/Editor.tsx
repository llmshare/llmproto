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
  constructor(public value: string, public value2: string) {
    super(value);
    this.addOutput(value2, new ClassicPreset.Output(socket, value));
    this.addControl(
      "a1",
      new ClassicPreset.InputControl("text", { initial: value2 })
    );
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
  const a = new TextNode("import", "langchain/llms/openai");
  await editor.addNode(a);
  a.addOutput("value", new ClassicPreset.Output(socket, "call-flow"));

  const b = new TextNode("import specifier", "{ OpenAI }");
  await editor.addNode(b);
  b.addInput("value", new ClassicPreset.Input(socket, "import"));
  // await editor.addConnection(
  //   new ClassicPreset.Connection(a, "value", b, "value")
  // );
  const c = new TextNode("import", "langchain/chains");
  await editor.addNode(c);
  c.addOutput("value", new ClassicPreset.Output(socket, "call-flow"));

  const d = new TextNode("import specifier", "{ loadSummarizationChain }");
  await editor.addNode(d);
  d.addInput("value", new ClassicPreset.Input(socket, "import"));

  const e = new TextNode("import", "langchain/text_splitter");
  await editor.addNode(e);
  e.addOutput("value", new ClassicPreset.Output(socket, "call-flow"));

  const f = new TextNode(
    "import specifier",
    "{ RecursiveCharacterTextSplitter }"
  );
  await editor.addNode(f);
  f.addInput("value", new ClassicPreset.Input(socket, "import"));

  const g = new TextNode("import", "fs");
  await editor.addNode(g);
  g.addOutput("value", new ClassicPreset.Output(socket, "call-flow"));

  const h = new TextNode("import specifier", "fs");
  await editor.addNode(h);
  h.addInput("value", new ClassicPreset.Input(socket, "import"));

  // await editor.addConnection(new ClassicPreset.Connection(b, "b", c, "c"));
  // await editor.addConnection(new ClassicPreset.Connection(c, "c", d, "d"));
  // await editor.addConnection(new ClassicPreset.Connection(d, "d", e, "e"));
  // await editor.addConnection(new ClassicPreset.Connection(e, "e", f, "f"));

  await area.translate(a.id, { x: -600, y: -100 });
  await area.translate(b.id, { x: -400, y: 0 });
  await area.translate(c.id, { x: -200, y: -100 });
  await area.translate(d.id, { x: 0, y: 0 });
  await area.translate(e.id, { x: 200, y: -100 });
  await area.translate(f.id, { x: 400, y: 0 });
  await area.translate(g.id, { x: 600, y: -100 });
  await area.translate(h.id, { x: 800, y: 0 });

  setTimeout(() => {
    // wait until nodes rendered because they dont have predefined width and height
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 10);
  return {
    destroy: () => area.destroy()
  };
}
