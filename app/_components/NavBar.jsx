import Link from "next/link";
import logo from "@/public/freshcart-logo.svg";
import Image from "next/image";

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
          <Link
            href="/signin"
            className="cursor-pointer py-2 px-4 rounded-xl border-green-700 border-2 hover:bg-green-700 hover:text-white 
          transition-all duration-300 "
          >
            sign in/sign up
          </Link>
        </div>

        {/* <div className="me-20">
          <Heart color={"text-green-700"} fill={"none"} />
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
