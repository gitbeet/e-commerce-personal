import FiltersSection from "./FiltersSection";
import PriceSlider from "./PriceSlider";

const FiltersComponent = () => {
  return (
    <div className="px-8 pt-8 pb-16  w-max space-y-8 min-w-[300px] ">
      <header className="text-xl mb-16">Filters</header>
      <div className="space-y-16">
        <PriceSlider />
        <FiltersSection title="Type" options={["SSD", "HDD", "Monitor"]} />
        <FiltersSection
          title="Brand"
          options={["SanDisk", "Samsung", "Acer", "Silicon Power", "Apple"]}
        />
      </div>
    </div>
  );
};

export default FiltersComponent;
