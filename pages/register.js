import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const router = useRouter();

  const { register, user, signout } = useAuth();

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
      await register(userData.email, userData.password);
      router.push("../successful");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email");
      }
      if (error.code === "auth/weak-password") {
        setErrorMessage("Weak password");
      }
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email already in use");
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
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
