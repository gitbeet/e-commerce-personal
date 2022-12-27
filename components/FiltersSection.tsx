import { useState } from "react";
import Button from "./Button";
import FiltersOption from "./FiltersOption";

interface Props {
  title: string;
  options: string[];
}

const FiltersSection = ({ title, options }: Props) => {
  const [showHidden, setShowHidden] = useState(false);
  return (
    <section className="w-full space-y-4 border-b pb-4 border-neutral-600">
      <header className="text-md font-semibold">{title}</header>
      <div>
        {options.map((option, i) => (
          <FiltersOption
            key={option}
            option={option}
            visible={i >= 3 && !showHidden ? false : true}
          />
        ))}
      </div>
      <Button
        text={`Show ${showHidden ? "Less" : "More"}`}
        type="ghost"
        textSize="xs"
        padding="4"
        shadow={false}
        onClick={() => {
          setShowHidden((prev) => !prev);
        }}
      />
    </section>
  );
};

export default FiltersSection;
