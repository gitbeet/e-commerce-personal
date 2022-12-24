import React from "react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultCard from "./SearchResultCard";
import useDebounce from "../hooks/useDebounce";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/config";
import algoliasearch from "algoliasearch/lite";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);
const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX);

const SearchComponent = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input, 1000);

  useEffect(() => {
    const performSearch = async (value) => {
      const { hits } = await index.search(value, {
        hitsPerPage: 5,
      });

      const results = hits.map((hit) => {
        const { objectID: id, title, image, price } = hit;
        return { id, title, image, price };
      });

      setResults(results);
    };

    performSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div>
      <SearchBar
        value={input}
        placeholder="Search a product"
        onChange={setInput}
      />
      {debouncedValue && (
        <div>
          {results.map((result) => (
            <SearchResultCard key={result.id} product={result} />
          ))}
        </div>
      )}
      {debouncedValue && results === [] ? (
        <p className="text-xl">Nothing found.</p>
      ) : null}
    </div>
  );
};

export default SearchComponent;
