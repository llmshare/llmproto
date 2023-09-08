import { ClassicPreset } from "rete";

export class DropdownControl extends ClassicPreset.Control {
  constructor(
    public label: string,
    public options: string[],
    public defaultValue: string,
    public onChange: (value: string) => void,
  ) {
    super();
  }
}

export default function Dropdown({ data }: { data: DropdownControl }) {
  return (
    <label htmlFor={data.label}>
      {data.label}
      <select
        name={data.label}
        id={data.label}
        onPointerDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        defaultValue={data.defaultValue}
        onChange={(e) => data.onChange(e.target.value)}
      >
        {data.options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
