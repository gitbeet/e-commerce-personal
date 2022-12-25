import Head from "next/head";
import SearchComponent from "../components/SearchComponent";
export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>E-shop Homepage</title>
        <meta name="description" content="E-shop e-commerce webpage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchComponent />
    </div>
  );
}
