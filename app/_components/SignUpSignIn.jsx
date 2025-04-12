"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SignUpSignIn = () => {
  const pathName = usePathname();
  let href;
  if (pathName === "/signup") href = "/signin";
  if (pathName === "/signin") href = "/signup";
  return (
    <Link
      href={href || "/signin"}
      className="cursor-pointer py-2 px-4 rounded-xl border-green-700 
      border-2 hover:bg-green-700 hover:text-white 
      transition-all duration-300"
    >
      sign in/sign up
    </Link>
  );
};

export default SignUpSignIn;
