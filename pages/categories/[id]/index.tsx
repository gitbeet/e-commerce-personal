import {
  collection,
  DocumentData,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "@firebase/firestore";
import db from "../../../firebase/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductsGrid from "components/ProductsGrid";
import Button from "components/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ScrollToTopElement from "components/ScrollToTopElement";
import OrderByComponent from "components/OrderByComponent";
import FiltersComponent from "components/FiltersComponent";

const HITS_PER_PAGE = 12;

const Category = () => {
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);

  const [firstItem, setFirstItem] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [lastItem, setLastItem] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  // ANY !!!!
  const [products, setProducts] = useState<any[]>([]);

  const [order, setOrder] = useState<string>("");

  const router = useRouter();
  const { id: currentCategory } = router.query;

  useEffect(() => {
    orderProducts();
  }, [order]);

  useEffect(() => {
    getInitialProducts();
    setFirstPage(true);
    setLastPage(false);
  }, [currentCategory]);

  const getNextPage = async () => {
    const collectionRef = collection(db, "productsList");
    const productQuery = query(
      collectionRef,
      order === "onSale"
        ? (where("discount", "!=", 0), where("category", "==", currentCategory))
        : where("category", "==", currentCategory),
      order === "priceDesc"
        ? orderBy("price", "desc")
        : order === "priceAsc"
        ? orderBy("price", "asc")
        : order === "rating"
        ? orderBy("rating.rate", "desc")
        : order === "ratingCount"
        ? orderBy("rating.count", "desc")
        : order === "onSale"
        ? orderBy("discount", "desc")
        : orderBy("id"),
      startAfter(lastItem),
      limit(HITS_PER_PAGE)
    );

    const productsSnapshot = await getDocs(productQuery);

    const products = productsSnapshot.docs
      .map((doc) => doc.data())
      .map((product) => ({ ...product, displayElement: true }));

    const lastVisible = productsSnapshot.docs[productsSnapshot.docs.length - 1];

    const firstVisible = productsSnapshot.docs[0];
    if (products.length < 1) {
      setLastPage(true);
      return;
    }
    setFirstPage(false);
    setLastPage(false);
    setProducts(products);
    setLastItem(lastVisible);
    setFirstItem(firstVisible);
  };

  const getPreviousPage = async () => {
    if (!firstItem) return;
    const collectionRef = collection(db, "productsList");
    const productQuery = query(
      collectionRef,
      order === "onSale"
        ? (where("discount", "!=", 0), where("category", "==", currentCategory))
        : where("category", "==", currentCategory),
      order === "priceDesc"
        ? orderBy("price", "desc")
        : order === "priceAsc"
        ? orderBy("price", "asc")
        : order === "rating"
        ? orderBy("rating.rate", "desc")
        : order === "ratingCount"
        ? orderBy("rating.count", "desc")
        : order === "onSale"
        ? orderBy("discount", "desc")
        : orderBy("id"),
      endBefore(firstItem),
      limitToLast(HITS_PER_PAGE)
    );

    const productsSnapshot = await getDocs(productQuery);

    const products = productsSnapshot.docs
      .map((doc) => doc.data())
      .map((product) => ({ ...product, displayElement: true }));

    const lastVisible = productsSnapshot.docs[productsSnapshot.docs.length - 1];

    const firstVisible = productsSnapshot.docs[0];
    if (products.length < 1) {
      setFirstPage(true);
      return;
    }
    setFirstPage(false);
    setLastPage(false);
    setProducts(products);
    setLastItem(lastVisible);
    setFirstItem(firstVisible);
  };

  async function getInitialProducts() {
    if (!currentCategory) return;
    const collectionRef = collection(db, "productsList");
    const productQuery = query(
      collectionRef,
      where("category", "==", currentCategory),
      orderBy("id"),
      limit(HITS_PER_PAGE)
    );

    const productsSnapshot = await getDocs(productQuery);

    const products = productsSnapshot.docs
      .map((doc) => doc.data())
      .map((product) => ({ ...product, displayElement: true }));

    const lastVisible = productsSnapshot.docs[productsSnapshot.docs.length - 1];

    setProducts(products);
    setLastItem(lastVisible);
  }

  async function orderProducts() {
    if (!currentCategory) return;
    const collectionRef = collection(db, "productsList");
    const productQuery = query(
      collectionRef,
      order === "onSale"
        ? (where("discount", "!=", 0), where("category", "==", currentCategory))
        : where("category", "==", currentCategory),
      order === "priceDesc"
        ? orderBy("price", "desc")
        : order === "priceAsc"
        ? orderBy("price", "asc")
        : order === "rating"
        ? orderBy("rating.rate", "desc")
        : order === "ratingCount"
        ? orderBy("rating.count", "desc")
        : order === "onSale"
        ? orderBy("discount", "desc")
        : orderBy("id"),
      limit(HITS_PER_PAGE)
    );

    const productsSnapshot = await getDocs(productQuery);

    const products = productsSnapshot.docs
      .map((doc) => doc.data())
      .map((product) => ({ ...product, displayElement: true }));

    const lastVisible = productsSnapshot.docs[productsSnapshot.docs.length - 1];
    setProducts(products);
    setLastItem(lastVisible);
    setFirstItem(null);
    setFirstPage(true);
    setLastPage(false);
  }

  const categoryHeader =
    currentCategory &&
    currentCategory[0].toUpperCase() + currentCategory.slice(1);
  return (
    <>
      <ScrollToTopElement scrollTrigger={products} />
      <div className="pt-8 pb-32 space-y-8 first-letter:">
        <button onClick={() => router.back()}>Go Back</button>
        <h1 className="text-4xl w-full text-left pb-8 ">{categoryHeader}</h1>
        <div className="min-w-full flex flex-col md:flex-row md:space-x-16">
          <div>
            <FiltersComponent />
          </div>
          <div className="w-full space-y-8">
            <OrderByComponent setOrder={setOrder} />
            <ProductsGrid products={products} />
          </div>
        </div>
        <div className="hidden md:flex space-x-4 w-full  justify-center items-center">
          <Button
            text="Previous Page"
            onClick={getPreviousPage}
            disabled={firstPage}
            icon={<FaArrowLeft />}
          />
          <Button
            text="Next Page"
            onClick={getNextPage}
            disabled={lastPage}
            icon={<FaArrowRight />}
            iconPlacement="right"
          />
        </div>
        <div className="flex  space-x-4 w-full  justify-center items-center md:hidden">
          <Button
            text=""
            onClick={getPreviousPage}
            disabled={firstPage}
            icon={<FaArrowLeft />}
          />
          <Button
            text=""
            onClick={getNextPage}
            disabled={lastPage}
            icon={<FaArrowRight />}
            iconPlacement="right"
          />
        </div>
      </div>
    </>
  );
};

export default Category;
