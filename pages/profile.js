/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import iconUserDefault from "../public/assets/icon-user-default.svg";
import { useRouter } from "next/router";

export default function Profile() {
  const { signout, user } = useAuth();

  const router = useRouter();
  function signOut() {
    signout();
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>E-shop Profile Page</title>
        <meta name="description" content="E-shop e-commerce webpage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Profile
      {user && (
        <>
          {/* not sure if working or not */}
          {user.photoUrl ? (
            <img src={user.photoUrl} alt="user avatar" />
          ) : (
            <svg
              width={40}
              height={40}
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 29 29"
            >
              <path d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z" />
            </svg>
          )}
          <h1>Welcome {user.displayName || user.email}</h1>
          <Button onClick={signOut} text="Logout" type="primary" size="lg" />
        </>
      )}
    </div>
  );
}
