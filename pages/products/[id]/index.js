/* eslint-disable @next/next/no-img-element */
import { formatCurrency } from "../../../utilities/formatCurrency";

export default function product({ product }) {
  const { image, title, price, description } = product;

  const formattedPrice = formatCurrency(price);

  return (
    <div className="">
      <div className="">
        <img src={image} alt="img of the product" />
      </div>
      <div className="">
        <div class="">
          <h1>{title}</h1>
          <p>{formattedPrice}</p>
        </div>
        <p className="">{description}</p>
      </div>
      {/* <SimilarProductsList currentProduct={product} allProducts={products} /> */}
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
