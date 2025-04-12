"use client";

import signupImg from "@/public/signup.svg";
import Image from "next/image";
import Link from "next/link";
const page = () => {
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
        <form action="" className="mt-10">
          <label htmlFor="name" className="block pb-2 font-semibold text-sm">
            Name
          </label>
          <input
            id="name"
            placeholder="Name"
            type="name"
            name="name"
            required
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
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          <label
            htmlFor="repassword"
            className="block my-2 font-semibold text-sm"
          >
            rePassword
          </label>
          <input
            id="repassword"
            placeholder="********"
            type="repassword"
            name="repassword"
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />
          <button
            disabled
            className="w-full mt-10 disabled:opacity-75 disabled:cursor-not-allowed bg-green-700 rounded-lg py-2 text-white cursor-pointer hover:bg-green-800"
          >
            Sign up
          </button>
        </form>
        <div className="font-semibold mt-5 mb-20">
          <p className="mb-2">
            You have an account?{" "}
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
