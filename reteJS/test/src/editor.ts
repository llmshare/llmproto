import { createRoot } from "react-dom/client";
import { NodeEditor, GetSchemes, ClassicPreset, NodeId } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import { DataflowEngine } from "rete-engine";
import {
  ContextMenuExtra,
  ContextMenuPlugin,
  Presets as ContextMenuPresets
} from "rete-context-menu-plugin";

const socket = new ClassicPreset.Socket("socket");

class Start extends ClassicPreset.Node<{}, { exec: ClassicPreset.Socket }, {}> {
    width = 180;
    height = 90;
  
    constructor() {
      super("Start");
      this.addOutput("exec", new ClassicPreset.Output(socket, "Exec"));
    }
  
    execute(_: never, forward: (output: "exec") => void) {
      forward("exec");
    }
  
    data() {
      return {};
    }
  }
class Log extends ClassicPreset.Node<
  { exec: ClassicPreset.Socket; message: ClassicPreset.Socket },
  { exec: ClassicPreset.Socket },
  {}
> {
  width = 180;
  height = 150;

  constructor(
    private log: (text: string) => void,
    private dataflow: DataflowEngine<Schemes>
  ) {
    super("Log");

    this.addInput("exec", new ClassicPreset.Input(socket, "Exec", true));
    this.addInput("message", new ClassicPreset.Input(socket, "Text"));
    this.addOutput("exec", new ClassicPreset.Output(socket, "Exec"));
  }

  async execute(input: "exec", forward: (output: "exec") => void) {
    const inputs = (await this.dataflow.fetchInputs(this.id)) as {
      message: string[];
    };

    this.log((inputs.message && inputs.message[0]) || "");

    forward("exec");
  }

  data() {
    return {};
  }
}

class TextNode extends ClassicPreset.Node<
  {},
  { value: ClassicPreset.Socket },
  { value: ClassicPreset.InputControl<"text"> }
> {
  height = 120;
  width = 180;

  constructor(initial: string,final:string) {
    super("Import");
    this.addControl(
      "value",
      new ClassicPreset.InputControl("text", { initial}),
    );
        this.addOutput("value", new ClassicPreset.Output(socket, "Output"));
  }

  execute() {}

  data(): { value: string } {
    return {
      value: this.controls.value.value || ""
    };
  }
}



class Connection<
  A extends Node,
  B extends Node,
> extends ClassicPreset.Connection<A, B> {}



type Node = TextNode;
type ConnProps =  Connection<TextNode,TextNode>;
type Schemes = GetSchemes<Node, ConnProps>;

type AreaExtra = ReactArea2D<any> | ContextMenuExtra;

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  
  const engine = new DataflowEngine<Schemes>();

  function process() {
    engine.reset();

    editor
      .getNodes()
      .filter((n) => n instanceof TextNode)
      .forEach((n) => engine.fetch(n.id));
  }
  
  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
      ["Import",()=> new TextNode("","")]
    ])
  });
  area.use(contextMenu);

  render.addPreset(Presets.contextMenu.setup());
  render.addPreset(Presets.classic.setup());

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(engine);
  editor.use(area);
  area.use(connection);
  area.use(render);

  AreaExtensions.showInputControl(area);

  return {
    destroy: () => area.destroy()
  };
}


