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
import algoliasearch from "algoliasearch/lite";
import ProductCard from "components/ProductCard";
import db from "../../../firebase/config";
import { DisplayProductInterface } from "Models";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "../../../styles/ProductsGrid.module.css";
import { useEffect, useRef, useState } from "react";
import { endsWith, first } from "lodash";
import ProductsGrid from "components/ProductsGrid";
import Button from "components/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HITS_PER_PAGE = 12;

const Category = () => {
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);

  const [firstItem, setFirstItem] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [lastItem, setLastItem] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  const scrollToTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollToTopRef.current) return;
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  }, [products]);

  useEffect(() => {
    getInitialProducts();
    setFirstPage(true);
    setLastPage(false);
  }, [id]);

  useEffect(() => {}, [page]);

  const getNextPage = async () => {
    const collectionRef = collection(db, "productsList");
    const productQuery = query(
      collectionRef,
      where("category", "==", id),
      orderBy("id"),
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
      where("category", "==", id),
      orderBy("id"),
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
    if (!id) return;
    const collectionRef = collection(db, "productsList");
    const productQuery = query(
      collectionRef,
      where("category", "==", id),
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
  const capitalizedTitle = id && id[0].toUpperCase() + id.slice(1);
  return (
    <>
      <div
        ref={scrollToTopRef}
        className="absolute top-0 left-1/2 bg-secondary-500 w-4 h-4"
      ></div>
      <div className="pt-16 pb-32 space-y-12">
        <button onClick={() => router.back()}>Go Back</button>
        <h1 className="text-5xl w-full text-center ">{capitalizedTitle}</h1>
        <ProductsGrid products={products} />
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
