import { useState } from "react";
import ReactSlider from "react-slider";
import { formatCurrency } from "utilities/formatCurrency";

const PriceSlider = () => {
  const [price, setPrice] = useState([0, 1000]);
  const maxPrice = 2000;

  return (
    <div className="h-4 space-y-8 pb-32">
      <header className="font-semibold text-md">Price Range</header>
      <div className="space-y-8">
        <div className="w-full text-sm text-center space-x-4">
          <span>{formatCurrency(price[0])}</span>
          <span>-</span>
          <span>{formatCurrency(price[1])}</span>
        </div>
        <div className="static">
          <ReactSlider
            min={0}
            max={maxPrice}
            onAfterChange={(e) => {
              setPrice(e);
            }}
            value={price}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => (
              <div
                {...props}
                className="absolute -top-3 bg-primary-500  w-8 h-8 flex justify-center items-center rounded-full "
              >
                {/* {state.valueNow} */}
              </div>
            )}
            renderTrack={(props, state) => (
              <div
                {...props}
                className={`${
                  state.index === 1 ? "bg-neutral-200" : "bg-neutral-600"
                } absolute top-0 h-2 bg-neutral-400`}
              />
            )}
            pearling
            minDistance={5}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
