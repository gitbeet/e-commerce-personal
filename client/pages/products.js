import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SelectMenu from "../components/SelectMenu";
import { useProductData } from "../context/ProductDataContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import debounce from "lodash.debounce";
import { ClipLoader } from "react-spinners";

export default function Products({ prodData }) {
  const { changeUser } = useShoppingCart();
  const [displayProducts, setDisplayProducts] = useState(prodData);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentOrder, setCurrentOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // CATEGORY FILTER
  useEffect(() => {
    if (!currentCategory) {
      setDisplayProducts(prodData);
    } else {
      setLoading(true);
      fetch(`https://fakestoreapi.com/products/category/${currentCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setDisplayProducts(data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [currentCategory]);

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

  function handleSearch() {
    fetch(`https://fakestoreapi.com/products/${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setDisplayProducts([...data]));
  }

  // const updateDebounceText = debounce((text) => {
  //   setSearchTerm(text);
  // });

  // function debounce(cb, delay = 1000) {
  //   console.log("rerunning");
  //   let timeout;

  //   return (...args) => {
  //     clearInterval(timeout);
  //     timeout = setInterval(() => {
  //       cb(...args);
  //     }, delay);
  //   };
  // }

  // useEffect(() => {
  //   fetch(`https://fakestoreapi.com/products/${searchTerm}`)
  //     .then((res) => res.json())
  //     .then((data) => setDisplayProducts([...data]));
  // }, [searchTerm]);

  // if (loading) return <h1>loading...</h1>;
  // if (error) return <h1>ERROR</h1>;

  return (
    <div className="px-[5%] py-10 space-y-12">
      {/* SEARCH BAR */}
      <div className="space-y-4">
        <SearchBar
          placeholder="Search"
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />

        <div className="flex items-end space-x-6">
          {/* MOBILE CATEGORIES */}
          <div className="w-full">
            <p className="text-md text-neutral-600">Select a category</p>
            <SelectMenu
              options={[
                "",
                "men's%20clothing",
                "women's%20clothing",
                "electronics",
                "jewelery",
              ]}
              onChange={assignCurrentCategory}
              value={currentCategory}
            />
          </div>
          {/* MD + CATEGORIES */}
          <div className="hidden md:flex">
            <button onClick={() => assignCurrentCategory(``)}>
              All products
            </button>
            <button onClick={() => assignCurrentCategory(`men's%20clothing`)}>
              Men&apos;s clothing
            </button>
            <button onClick={() => assignCurrentCategory(`women's%20clothing`)}>
              Women&apos;s clothing
            </button>
            <button onClick={() => assignCurrentCategory(`electronics`)}>
              Electronics
            </button>
            <button onClick={() => assignCurrentCategory(`jewelery`)}>
              Jewelry
            </button>
          </div>
          {/* FILTER */}
          <div className="w-full">
            <span className="text-md text-neutral-600">Order by</span>
            <SelectMenu
              options={[
                "",
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
      <div className="space-y-12">
        <ClipLoader
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "auto",
            marginTop: "5rem",
            borderColor: "orange",
          }}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {displayProducts &&
          !loading &&
          displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  // 'fake' limit so we limit but we have all categories
  const res = await fetch("https://fakestoreapi.com/products/");
  const prodData = await res.json();

  return {
    props: {
      prodData,
    },
  };
};
