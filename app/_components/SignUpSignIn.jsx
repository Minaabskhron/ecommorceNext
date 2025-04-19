"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Heart from "../_svg/Heart";
import Cart from "../_svg/Cart";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { useWishList } from "../_context/WishListContext";
import { useCart } from "../_context/CartContext";

const SignUpSignIn = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { wishList } = useWishList();
  const { cartList } = useCart();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pathName = usePathname();
  let href;
  if (pathName === "/signup") href = "/signin";
  if (pathName === "/signin") href = "/signup";

  return (
    <>
      {session ? (
        <div ref={menuRef} className="flex justify-center items-center me-20">
          <div className="cursor-pointer relative">
            <Link href="/wishlist">
              <Heart color={"text-green-700"} />
            </Link>
            <span className="absolute top-0 py-[3px] text-[9px] text-white -left-1 px-[5px] bg-red-500 rounded-lg">
              {wishList.data?.length}
            </span>
          </div>
          <div className="relative ms-5">
            <Link href="/cart">
              <Cart />
            </Link>
            <span className="absolute top-0 py-[3px] text-[9px] text-white -left-1 px-[5px] bg-red-500 rounded-lg">
              {cartList?.length || 0}
            </span>
          </div>
          <div>
            <span
              className="bg-green-700 text-white py-2 px-3 cursor-pointer rounded-full"
              onClick={() => {
                setOpen((s) => !s);
              }}
            >
              {session.user.name[0].toUpperCase()}
            </span>

            {open && (
              <div className="relative">
                <div className="absolute right-0 mt-4 w-44 bg-white  rounded-lg shadow-md z-50 text-sm">
                  <div className="border-b-1 border-b-green-700 pt-4 px-4">
                    <p className="font-semibold text-green-700 mb-1">
                      {session.user.name}
                    </p>
                    <p className="text-black font-semibold mb-3 truncate ">
                      {session.user.email}
                    </p>
                  </div>

                  <button
                    onClick={() => signOut({ callbackUrl: "/signin" })}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100
                     hover:text-green-700 text-gray-700 cursor-pointer transition "
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
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
