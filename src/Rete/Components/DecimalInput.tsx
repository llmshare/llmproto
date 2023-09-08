import React from "react";
import { ClassicPreset } from "rete";

export class DecimalControl extends ClassicPreset.InputControl<"number"> {
  constructor(
    public label: string,
    public onChange: (value: number) => void,
    public readonly: boolean = false,
  ) {
    super("number", { initial: 0, change: onChange, readonly });
  }
}

export default function DecimalInput({ data }: { data: DecimalControl }) {
  const [value, setValue] = React.useState(data.value);

  React.useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  return (
    <>
      <label htmlFor={data.label}>{data.label}</label>
      <input
        value={value}
        id={data.label}
        type="number"
        readOnly={data.readonly}
        min={0}
        step={0.1}
        onPointerDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setValue(+e.target.value);
          data.onChange(+e.target.value);
        }}
      />
    </>
  );
}
