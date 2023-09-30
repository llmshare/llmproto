import { useState } from "react";
import { ClassicPreset } from "rete";

export class LabelledInputControl extends ClassicPreset.Control {
  constructor(
    public label: string,
    public initialValue: string | number,
    public onChange: (value: string | number) => void,
    public type: "number" | "text" = "text",
  ) {
    super();
  }
}

export default function LabelledInput({
  data,
}: {
  data: LabelledInputControl;
}) {
  const [value, setValue] = useState(data.initialValue);

  return (
    <label htmlFor={data.label}>
      {data.label}
      <input
        type={data.type}
        value={value}
        name={data.label}
        id={data.label}
        onPointerDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          data.onChange(e.target.value);
          setValue(e.target.value);
        }}
      />
    </label>
  );
}
