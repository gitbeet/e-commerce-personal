import { v4 as uuid } from "uuid";

export default function SelectMenu({ options, onChange, value }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12  rounded-md text-center px-2 text-sm capitalize"
    >
      {options.map((option) => {
        return (
          <option className="capitalize" key={uuid()}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
