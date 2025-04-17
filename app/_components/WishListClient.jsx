"use client";

import { baseUrl } from "../_lib/const";
import Image from "next/image";
import Trash from "../_svg/Trash";
import { useState } from "react";

const WishListClient = ({ wishListData, token }) => {
  const [wishList, setWishList] = useState(wishListData);

  const removeProduct = async (id) => {
    const res = await fetch(`${baseUrl}/api/v1/wishlist/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token },
    });
    const data = await res.json();
    setWishList(data);
  };
  return (
    <>
      <div className="pt-10">
        <h1 className="text-3xl font-semibold mb-10 text-gray-500">
          Wishing List
        </h1>
        {wishList.data.length === 0 ? (
          <>
            <div className="flex justify-center items-center py-20">
              <p className="text-5xl font-semibold">Your Wishlist Is Empty</p>
            </div>
          </>
        ) : (
          <>
            {wishList.data.map((product) => (
              <div key={product._id} className="shadow-xl mb-5 p-5">
                <div className="flex items-center">
                  <Image
                    width={110}
                    height={90}
                    src={product.imageCover}
                    alt="product image"
                  />
                  <div className="flex items-center justify-between flex-grow">
                    <div className="ps-5 mt-2">
                      <p className="text-gray-500 font-semibold text-lg">
                        {product.title.split(" ").slice(0, 4).join(" ")}
                      </p>
                      <p className="text-green-600 font-semibold">
                        {product.price} EGP
                      </p>
                      <button
                        className="text-red-500 cursor-pointer mt-2"
                        onClick={() => {
                          removeProduct(product._id);
                        }}
                      >
                        <div className="flex">
                          <Trash />
                          Remove
                        </div>
                      </button>
                    </div>

                    <button
                      className="bg-green-700 text-white px-4 py-2 rounded-xl 
                transition-all duration-300 cursor-pointer hover:bg-green-900"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default WishListClient;
