import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const router = useRouter();

  const { login, user, signout } = useAuth();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setErrorMessage("");
    try {
      await login(userData.email, userData.password);
      router.push("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorMessage("You have enetered an invalid email");
      }
      if (error.code === "auth/user-not-found") {
        setErrorMessage("User not found");
      }
      if (error.code === "auth/wrong-password") {
        setErrorMessage("Wrong Password");
      }
    }
  }

  if (user) {
    return (
      <div>
        <h1>You are already logged in as {user.email}</h1>
        <button onClick={signout}>Logout</button>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>E-shop Login Page</title>
        <meta name="description" content="E-shop e-commerce webpage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        {errorMessage && (
          <h1 className="text-danger-500 text-center">{errorMessage}</h1>
        )}
        <label htmlFor="email">Email</label>
        <input
          className="border"
          id="email"
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          className="border"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}
