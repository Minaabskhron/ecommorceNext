"use client";

import signupImg from "@/public/signup.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { baseUrl } from "../_lib/const";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [errors, setErrors] = useState("");
  const router = useRouter();

  const isDisabled =
    name.trim() === "" ||
    email.trim() === "" ||
    phone.trim() === "" ||
    password.trim() === "" ||
    rePassword.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setErrors("Passwords don't match");
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, rePassword }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.errors?.msg || data.message || "Sign up failed");
      }
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (signInRes?.ok) {
        router.push("/");
      } else {
        router.push("/signin"); // Redirect to sign-in if auto-login fails
      }
    } catch (error) {
      setErrors(error.message);
    }
  };
  return (
    <div className="flex justify-evenly items-center mt-10  ">
      <div>
        <Image src={signupImg} alt="sign in image" />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Get Start Shopping
        </h1>
        <p>Welcome back to FreshCart! Enter your email to get started.</p>
        <form onSubmit={handleSubmit} className="mt-10">
          <label htmlFor="name" className="block pb-2 font-semibold text-sm">
            Name
          </label>
          <input
            id="name"
            placeholder="Name"
            type="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          <label htmlFor="email" className="block my-2 font-semibold text-sm">
            Email
          </label>
          <input
            id="email"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />

          <label htmlFor="phone" className="block my-2 font-semibold text-sm">
            Phone
          </label>
          <input
            id="phone"
            placeholder="Phone"
            type="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          <label
            htmlFor="password"
            className="block my-2 font-semibold text-sm"
          >
            Password
          </label>
          <input
            id="password"
            placeholder="********"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          <label
            htmlFor="rePassword"
            className="block my-2 font-semibold text-sm"
          >
            rePassword
          </label>
          <input
            id="rePassword"
            placeholder="********"
            type="password"
            name="rePassword"
            value={rePassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          {errors && (
            <p className="bg-red-200 p-2 px-2 mt-4 rounded-xl">{errors}</p>
          )}
          <button
            disabled={isDisabled}
            className="w-full mt-10 disabled:opacity-75 disabled:cursor-not-allowed bg-green-700 rounded-lg py-2 text-white cursor-pointer hover:bg-green-800"
          >
            Sign up
          </button>
        </form>
        <div className="font-semibold mt-5 mb-20">
          <p className="mb-2">
            You have an account?
            <Link className="text-green-700" href="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
