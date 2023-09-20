import { useState } from "react";
import { ClassicPreset } from "rete";

export class CheckboxControl extends ClassicPreset.Control {
  constructor(
    public label: string,
    public initialValue: boolean,
    public onChange: (value: boolean) => void,
  ) {
    super();
  }
}

export default function Checkbox({ data }: { data: CheckboxControl }) {
  const [value, setValue] = useState(data.initialValue);

  return (
    <label htmlFor={data.label}>
      {data.label}
      <input
        type="checkbox"
        checked={value}
        name={data.label}
        id={data.label}
        onPointerDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          data.onChange(e.target.checked);
          setValue(e.target.checked);
        }}
      />
    </label>
  );
}
