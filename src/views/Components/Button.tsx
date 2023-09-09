import { ClassicPreset } from "rete";

export class ButtonControl extends ClassicPreset.Control {
  constructor(
    public label: string,
    public onClick: () => void,
  ) {
    super();
  }
}

export default function Button({ data }: { data: ButtonControl }) {
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
