"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Heart from "../_svg/Heart";
import Cart from "../_svg/Cart";

const SignUpSignIn = () => {
  const { data: session } = useSession();

  const pathName = usePathname();
  let href;
  if (pathName === "/signup") href = "/signin";
  if (pathName === "/signin") href = "/signup";
  return (
    <>
      {session ? (
        <div className="flex justify-center items-center me-20">
          <div className=" relative">
            <Heart color={"text-green-700"} />
            <span className="absolute top-0 py-[3px] text-[9px] text-white -left-1 px-[5px] bg-red-500 rounded-lg">
              0
            </span>
          </div>
          <div className="relative ms-5">
            <Cart />
            <span className="absolute top-0 py-[3px] text-[9px] text-white -left-1 px-[5px] bg-red-500 rounded-lg">
              0
            </span>
          </div>
          <div>
            <span className="bg-green-700 text-white py-2 px-3 cursor-pointer rounded-full">
              {session.user.name[0].toUpperCase()}
            </span>
          </div>
        </div>
      ) : (
        <Link
          href={href || "/signin"}
          className="cursor-pointer py-2 px-4 rounded-xl border-green-700 
      border-2 hover:bg-green-700 hover:text-white 
      transition-all duration-300"
        >
          sign in/sign up
        </Link>
      )}
    </>
  );
};

export default SignUpSignIn;
