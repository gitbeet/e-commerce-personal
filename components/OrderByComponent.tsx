import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

interface Props {
  setOrder: Dispatch<SetStateAction<string>>;
}

const OrderByComponent = ({ setOrder }: Props): JSX.Element => {
  return (
    <div className="space-x-4 text-right">
      <Button
        textSize="sm"
        text="Highest Price"
        onClick={() => {
          setOrder("priceDesc");
        }}
      />
      <Button
        textSize="sm"
        text="Lowest Price"
        onClick={() => {
          setOrder("priceAsc");
        }}
      />
      <Button
        textSize="sm"
        text="Best Rated"
        onClick={() => {
          setOrder("rating");
        }}
      />
      <Button
        textSize="sm"
        text="Most Popular"
        onClick={() => {
          setOrder("ratingCount");
        }}
      />
      <Button
        textSize="sm"
        text="On Sale"
        onClick={() => {
          setOrder("onSale");
        }}
      />
    </div>
  );
};

export default OrderByComponent;
