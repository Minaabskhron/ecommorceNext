"use client";

import signupImg from "@/public/signup.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { baseUrl } from "../_lib/const";
import { validateField } from "../_lib/validateForm";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formData = { name, email, phone, password, rePassword };

  const hasFormErrors = () => {
    return (
      Object.values(errors).some((error) => error && error !== "") ||
      name === "" ||
      email === "" ||
      phone === "" ||
      password === "" ||
      rePassword === "" ||
      password !== rePassword
    );
  };
  const handleBlur = (fieldName) => {
    const error = validateField(fieldName, formData[fieldName], formData);
    setErrors((prev) => ({ ...prev, [fieldName]: error, back: "" }));
  };

  const onkeyUp = (value) => {
    if (errors[value] || errors.back) handleBlur(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, rePassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        throw new Error(data.errors?.msg || data.message || "Sign up failed");
      }
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);
      if (signInRes?.ok) {
        router.push("/");
      } else {
        router.push("/signin"); // Redirect to sign-in if auto-login fails
      }
    } catch (error) {
      setErrors({ back: error.message });
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
          <div className="flex justify-between">
            <label htmlFor="name" className="block pb-2 font-semibold text-sm">
              Name
            </label>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <input
            onBlur={() => {
              handleBlur("name");
            }}
            onKeyUp={() => {
              onkeyUp("name");
            }}
            id="name"
            placeholder="Name"
            type="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          <div className="flex justify-between items-center">
            <label htmlFor="email" className="block my-2 font-semibold text-sm">
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <input
            onKeyUp={() => {
              onkeyUp("email");
            }}
            onBlur={() => {
              handleBlur("email");
            }}
            id="email"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />

          <div className="flex justify-between items-center">
            <label htmlFor="phone" className="block my-2 font-semibold text-sm">
              Phone
            </label>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <input
            onBlur={() => {
              handleBlur("phone");
            }}
            onKeyUp={() => {
              onkeyUp("phone");
            }}
            id="phone"
            placeholder="Phone"
            type="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="block my-2 font-semibold text-sm"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <input
            onBlur={() => {
              handleBlur("password");
            }}
            onKeyUp={() => {
              onkeyUp("password");
            }}
            id="password"
            placeholder="********"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          <div className="flex justify-between items-center">
            <label
              htmlFor="rePassword"
              className="block my-2 font-semibold text-sm"
            >
              rePassword
            </label>
            {errors.rePassword && (
              <p className="text-red-500 text-sm">{errors.rePassword}</p>
            )}
          </div>

          <input
            onKeyUp={() => {
              onkeyUp("rePassword");
            }}
            onBlur={() => {
              handleBlur("rePassword");
            }}
            id="rePassword"
            placeholder="********"
            type="password"
            name="rePassword"
            value={rePassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          {errors.back && (
            <p className="bg-red-200 p-2 px-2 mt-4 rounded-xl">{errors.back}</p>
          )}
          <button
            disabled={hasFormErrors() || loading}
            className="w-full mt-10 disabled:opacity-75 
          disabled:cursor-not-allowed bg-green-700 
          rounded-lg py-2 text-white cursor-pointer hover:bg-green-800"
          >
            {loading ? "loading..." : "Sign Up"}
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
