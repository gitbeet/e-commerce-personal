interface Props {
  option: string;
  visible: boolean;
}

const FiltersOption = ({ option, visible }: Props) => {
  return (
    <div className={`${visible ? "block" : "hidden"} space-x-4 text-sm`}>
      <input id={option} type="checkbox" />
      <label htmlFor={option}>{option}</label>
    </div>
  );
};

export default FiltersOption;
