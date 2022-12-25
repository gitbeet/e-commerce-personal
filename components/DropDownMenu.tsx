import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";

interface Props {
  header: string;
  options: string[];
}

const DropDownMenu = ({ header, options }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative z-[1000]"
    >
      <div className=" cursor-pointer text-primary-500 flex items-center">
        <div
          className="flex space-x-2 justify-center items-center"
          onMouseEnter={() => setIsOpen(true)}
        >
          <h1>{header}</h1>
          <div
            className={`${
              isOpen ? "-rotate-180" : ""
            } transition-transform duration-[0.25s]`}
          >
            <VscTriangleDown />
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen
            ? "opacity-100 scale-y-100 origin-top"
            : "opacity-0 scale-y-0 pointer-events-none origin-top"
        } absolute bg-neutral-900 -translate-x-4  p-6  w-max space-y-6 shadow-lg transition-all duration-[0.25s]`}
      >
        {options.map((option) => (
          <p className="cursor-pointer hover-hover:hover:text-neutral-400">
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};
export default DropDownMenu;
