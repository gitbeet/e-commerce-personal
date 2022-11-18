import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SelectMenu from "../components/SelectMenu";
import { useProductData } from "../context/ProductDataContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ClipLoader } from "react-spinners";

import db from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function Products({ prodData }) {
  const { changeUser } = useShoppingCart();
  const [displayProducts, setDisplayProducts] = useState(prodData);
  const [initialProducts, setInitialProducts] = useState(prodData);
  const [currentCategory, setCurrentCategory] = useState("All products");
  const [currentOrder, setCurrentOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let prod = prodData.map((product) => {
      return { ...product, displayElement: true };
    });
    setDisplayProducts(prod);
    setInitialProducts(prod);
  }, [prodData]);

  useEffect(() => {
    if (currentCategory === "All products") {
      setDisplayProducts(initialProducts);
    }
    if (currentCategory === `Men's clothing`) {
      setDisplayProducts(initialProducts);
      setDisplayProducts((prev) =>
        prev.filter((product) => product.category === `men's clothing`)
      );
    }
    if (currentCategory === `Women's clothing`) {
      setDisplayProducts(initialProducts);
      setDisplayProducts((prev) =>
        prev.filter((product) => product.category === `women's clothing`)
      );
    }
    if (currentCategory === "Electronics") {
      setDisplayProducts(initialProducts);
      setDisplayProducts((prev) =>
        prev.filter((product) => product.category === "electronics")
      );
    }
    if (currentCategory === "Jewelery") {
      setDisplayProducts(initialProducts);
      setDisplayProducts((prev) =>
        prev.filter((product) => product.category === "jewelery")
      );
    }
  }, [currentCategory, initialProducts]);

  // SORTING ITEMS
  useEffect(() => {
    if (currentOrder === "Price(From low to high)") {
      let p = [...displayProducts].sort((a, b) => {
        return a.price - b.price;
      });
      setDisplayProducts((prev) => (prev = p));
    }
    if (currentOrder === "Price(From high to low)") {
      let q = [...displayProducts].sort((a, b) => {
        return b.price - a.price;
      });
      setDisplayProducts((prev) => (prev = q));
    }
    if (currentOrder === "Rating") {
      let q = [...displayProducts].sort((a, b) => {
        return b.rating.rate - a.rating.rate;
      });
      setDisplayProducts((prev) => (prev = q));
    }
    if (currentOrder === "Popularity") {
      let q = [...displayProducts].sort((a, b) => {
        return a.rating.count - b.rating.count;
      });
      setDisplayProducts((prev) => (prev = q));
    }
  }, [currentOrder]);

  function assignCurrentCategory(value) {
    setCurrentCategory(value);
  }

  function assignCurrentOrder(value) {
    setCurrentOrder(value);
  }

  function handleSearch(value) {
    setDisplayProducts((prev) =>
      prev.map((product) =>
        product.title.toLowerCase().includes(value)
          ? { ...product, displayElement: true }
          : { ...product, displayElement: false }
      )
    );
    console.log(value);
  }

  // if (loading) return <h1>loading...</h1>;
  // if (error) return <h1>ERROR</h1>;

  return (
    <div className="px-[5%] py-10 space-y-12">
      {/* SEARCH BAR */}
      <div className="space-y-10">
        <SearchBar placeholder="Search our products" onChange={handleSearch} />

        <div className="flex items-end space-x-6">
          {/* MOBILE CATEGORIES */}
          <div className="w-full space-y-4">
            <p className="text-md text-neutral-600">Select a category</p>
            <SelectMenu
              options={[
                "All products",
                "Men's clothing",
                "Women's clothing",
                "Electronics",
                "Jewelery",
              ]}
              onChange={assignCurrentCategory}
              value={currentCategory}
            />
          </div>
          {/* MD + CATEGORIES */}
          <div className="hidden md:flex">
            <button onClick={() => assignCurrentCategory("All products")}>
              All products
            </button>
            <button onClick={() => assignCurrentCategory("Men's clothing")}>
              Men&apos;s clothing
            </button>
            <button onClick={() => assignCurrentCategory("Women's clothing")}>
              Women&apos;s clothing
            </button>
            <button onClick={() => assignCurrentCategory("Electronics")}>
              Electronics
            </button>
            <button onClick={() => assignCurrentCategory("Jewelery")}>
              Jewelry
            </button>
          </div>
          {/* FILTER */}
          <div className="w-full space-y-4">
            <span className="text-md text-neutral-600">Order by</span>
            <SelectMenu
              options={[
                "----------",
                "Price(From low to high)",
                "Price(From high to low)",
                "Popularity",
                "Rating",
              ]}
              onChange={assignCurrentOrder}
              value={currentOrder}
            />
          </div>
        </div>
      </div>
      <div className="md:gap-8  md:flex flex-wrap justify-center items-stretch">
        {displayProducts &&
          displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const productsCollectionRef = collection(db, "productsList");
  const productsSnapshot = await getDocs(productsCollectionRef);
  const prodData = productsSnapshot.docs.map((doc) => doc.data());

  return {
    props: {
      prodData,
    },
  };
};
