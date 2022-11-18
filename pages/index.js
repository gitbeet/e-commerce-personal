import Head from "next/head";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
export default function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <Head>
        <title>E-shop Homepage</title>
        <meta name="description" content="E-shop e-commerce webpage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar />
    </div>
  );
}
