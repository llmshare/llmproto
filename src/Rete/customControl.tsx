// eslint-disable-next-line max-classes-per-file
import { createRoot } from "react-dom/client";
import { ClassicPreset, GetSchemes, NodeEditor } from "rete";
import { AreaExtensions, AreaPlugin } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { Presets, ReactArea2D, ReactPlugin } from "rete-react-plugin";

import DecimalInput, { DecimalControl } from "@/Rete/Components/DecimalInput";

class Node extends ClassicPreset.Node<
  { [key in string]: ClassicPreset.Socket },
  { [key in string]: ClassicPreset.Socket },
  {
    [key in string]:
      | DecimalControl
      | ButtonControl
      | ProgressControl
      | ClassicPreset.Control
      | ClassicPreset.InputControl<"number" | "text">;
  }
> {}
class Connection<
  A extends Node,
  B extends Node,
> extends ClassicPreset.Connection<A, B> {}

type Schemes = GetSchemes<Node, Connection<Node, Node>>;
type AreaExtra = ReactArea2D<any>;

class ButtonControl extends ClassicPreset.Control {
  constructor(
    public label: string,
    public onClick: () => void,
  ) {
    super();
  }
}

class ProgressControl extends ClassicPreset.Control {
  constructor(public percent: number) {
    super();
  }
}

function CustomButton({ data }: { data: ButtonControl }) {
  return (
    <button
      type="button"
      onPointerDown={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      onClick={data.onClick}
    >
      {data.label}
    </button>
  );
}

function CustomProgress({ data }: { data: ProgressControl }) {
  return <span>{data.percent}</span>;
}

export default async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket("socket");

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  render.addPreset(
    Presets.classic.setup({
      customize: {
        control(data) {
          if (data.payload instanceof DecimalControl) {
            return DecimalInput;
          }
          if (data.payload instanceof ButtonControl) {
            return CustomButton;
          }
          if (data.payload instanceof ProgressControl) {
            return CustomProgress;
          }
          if (data.payload instanceof ClassicPreset.InputControl) {
            return Presets.classic.Control;
          }
          return null;
        },
      },
    }),
  );
  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  const a = new Node("A");
  a.addOutput("a", new ClassicPreset.Output(socket));

  const progressControl = new ProgressControl(0);
  const inputControl = new DecimalControl(
    "percent",
    (value) => {
      progressControl.percent = value;
      area.update("control", progressControl.id);
    },
    // true,
  );

  // to log all events
  // area.addPipe((ctx) => {
  //   if (!ctx.type.includes("pointer")) console.log(ctx);
  //   return ctx;
  // });

  a.addControl("input", inputControl);
  a.addControl("progress", progressControl);
  a.addControl(
    "button",
    new ButtonControl("Randomize", () => {
      const percent = (Math.random() * 100).toFixed(2);

      inputControl.setValue(+percent);
      area.update("control", inputControl.id);

      progressControl.percent = +percent;
      area.update("control", progressControl.id);
    }),
  );
  await editor.addNode(a);

  await AreaExtensions.zoomAt(area, editor.getNodes());

  return {
    destroy: () => area.destroy(),
  };
}
