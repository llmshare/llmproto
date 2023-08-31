import React from "react";
import { ClassicPreset } from "rete";

export class DecimalControl extends ClassicPreset.Control {
  constructor(
    public label: string,
    public onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ) {
    super();
  }
}

export default function DecimalInput({ data }: { data: DecimalControl }) {
  return (
    <>
      <label htmlFor={data.label}>{data.label}</label>
      <input
        id={data.label}
        type="number"
        defaultValue="0"
        step="0.1"
        onPointerDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        onChange={data.onChange}
      />
    </>
  );
}
