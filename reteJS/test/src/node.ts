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
import { DataflowEngine } from "rete-engine";

const socket=new ClassicPreset.Socket("socket");

class NumberNode extends ClassicPreset.Node<{},{value:ClassicPreset.Socket},{value:ClassicPreset.InputControl<"number">}> {
    width = 180;
    height = 200;
  
    // constructor() {
    //   super("Node");
  
    //   this.addInput("port", new ClassicPreset.Input(socket));
    // //   this.addInput("portss",new ClassicPreset.Input(socket));
    //   this.addControl("port",new ClassicPreset.InputControl("text",{initial:"Ashu",readonly:false}))
    //   this.addOutput("port", new ClassicPreset.Output(socket));
    // }
    constructor(initial:number,change?:()=>void){
        super("Number")

        this.addControl("value",new ClassicPreset.InputControl("number",{initial,change}))
        this.addOutput("value",new ClassicPreset.Output(socket,"Number"));

    }
    data():{value:number}{
        return{
            value:this.controls.value.value || 0
        }
    }
}

class AddNode extends ClassicPreset.Node<
{ left: ClassicPreset.Socket; right: ClassicPreset.Socket },
{ value: ClassicPreset.Socket },
{ value: ClassicPreset.InputControl<"number"> }
>{
    height = 190;
  width = 180;

  constructor(change?: ()=>void,
  private update?: (control: ClassicPreset.InputControl<"number">) => void){
    super("Add")
    const left=new ClassicPreset.Input(socket,"num1");
    const right=new ClassicPreset.Input(socket,"num2");

    left.addControl(
        new ClassicPreset.InputControl("number", { initial: 0, change })
      );
      right.addControl(
        new ClassicPreset.InputControl("number", { initial: 0, change })
      );

    this.addInput("left",left);
    this.addInput("right",right);
    this.addControl("value",new ClassicPreset.InputControl("number",{readonly:true}));
    this.addOutput("value",new ClassicPreset.Output(socket,"Number"));

    }
    data(inputs: { left?: number[]; right?: number[] }): { value: number } {
      const leftControl = this.inputs.left?.control as ClassicPreset.InputControl<"number">;
      const rightControl = this.inputs.right?.control as ClassicPreset.InputControl<"number">;
      const { left, right } = inputs;
    const value =(left ? left[0] : leftControl.value || 0) + (right ? right[0] : rightControl.value || 0);

    this.controls.value.setValue(value);

    if (this.update) this.update(this.controls.value);

    return { value };
    }
}

class Connection<
A extends Node,
B extends Node,
> extends ClassicPreset.Connection<A,B> {}

type Node=NumberNode|AddNode;
type ConnProps=Connection<NumberNode,AddNode>
type Schemes = GetSchemes<Node, ConnProps>;
type AreaExtra = ReactArea2D<any> | ContextMenuExtra;


export async function createEditor(container: HTMLElement) {
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
      .filter((n) => n instanceof AddNode)
      .forEach((n) => engine.fetch(n.id));
  }

  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([      
    ["Number", () => new NumberNode(0,process)],
    ["Add", () => new AddNode(process)]
])
  });

  render.addPreset(Presets.classic.setup());
  render.addPreset(Presets.contextMenu.setup());
  connection.addPreset(ConnectionPresets.classic.setup());
  
  editor.use(area);
  editor.use(engine)
  area.use(connection);
  area.use(render);
  area.use(contextMenu);

  return {
    destroy: () => area.destroy()
  };
}