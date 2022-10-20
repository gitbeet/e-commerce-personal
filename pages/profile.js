import Head from "next/head";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { signout, user } = useAuth();

  return (
    <div>
      <Head>
        <title>E-shop Profile Page</title>
        <meta name="description" content="E-shop e-commerce webpage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Profile
      {user && (
        <Button onClick={signout} text="Logout" type="primary" size="lg" />
      )}
    </div>
  );
}
