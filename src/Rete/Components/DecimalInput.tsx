import React from "react";
import { ClassicPreset } from "rete";

export class DecimalControl extends ClassicPreset.Control {
  value: number = 0;

  constructor(
    public label: string,
    public onChange: (e: React.ChangeEvent<HTMLInputElement> | number) => void,
  ) {
    super();
  }

  setValue(val: number) {
    this.value = val;
    this.onChange(val);
  }
}

export default function DecimalInput({ data }: { data: DecimalControl }) {
  return (
    <>
      <label htmlFor={data.label}>{data.label}</label>
      <input
        id={data.label}
        type="number"
        defaultValue={0}
        min={0}
        step={0.1}
        onPointerDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        onChange={data.onChange}
      />
    </>
  );
}
