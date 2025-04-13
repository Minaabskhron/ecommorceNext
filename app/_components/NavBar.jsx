import Link from "next/link";
import logo from "@/public/freshcart-logo.svg";
import Image from "next/image";
import SignUpSignIn from "./SignUpSignIn";

const NavBar = () => {
  return (
    <div className="bg-[#eee] w-full p-3 fixed top-0 text-gray-500 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center ms-28">
          <Link href="/">
            <Image src={logo} className="pe-3" alt="logo" priority />
          </Link>
          <ul className="flex gap-5">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/products">Products</Link>
            </li>

            <li>
              <Link href="/brands">Brands</Link>
            </li>

            <li>
              <Link href="/categories">Categories</Link>
            </li>
          </ul>
        </div>
        <div className="me-20 ">
          <SignUpSignIn />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
