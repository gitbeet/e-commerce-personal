/* eslint-disable @next/next/no-img-element */
import SimilarProductsList from "../../../components/SimilarProductsList";
import { formatCurrency } from "../../../utilities/formatCurrency";

export default function Product({ product }) {
  const { image, title, price, description, category, id } = product;

  const formattedPrice = formatCurrency(price);

  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-10">
      <div className="w-[min(90%,500px)]">
        <img src={image} alt="img of the product" />
      </div>
      <div className="">
        <div class="">
          <h1>{title}</h1>
          <p>{formattedPrice}</p>
        </div>
        <p className="">{description}</p>
      </div>
      <div className="w-full h-auto text-center space-y-8 py-8 border-t border-b  border-neutral-500">
        <p className="text-xl text-primary-200 font-semibold uppercase">
          You may also like
        </p>
        <SimilarProductsList productId={id} category={category} />
      </div>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/${context.params.id}`
  );
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);

  const products = await res.json();

  const ids = products.map((product) => product.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
