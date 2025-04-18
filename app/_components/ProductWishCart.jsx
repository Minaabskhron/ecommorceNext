"use client";

import Image from "next/image";
import Trash from "../_svg/Trash";
import LoadingSvg from "../_svg/LoadingSvg";
import Link from "next/link";
import { useCart } from "../_context/CartContext";
import { useState } from "react";

const ProductWishCart = ({ list, stateId, removeProduct, loading, cart }) => {
  const { UpdateQuantity } = useCart();
  return (
    <div>
      {list?.length === 0 ? (
        <>
          <div
            className={`${
              cart
                ? "flex-col text-center gap-20"
                : "justify-center items-center py-20"
            } flex`}
          >
            <p className="text-5xl font-semibold">
              {cart ? "Your Cart Is Empty" : "Your Wishlist Is Empty"}
            </p>
            {cart ? (
              <Link
                className="w-full bg-green-700 rounded-lg py-2 mb-20 text-white cursor-pointer hover:bg-green-800"
                href={"/products"}
              >
                Go To Shopping
              </Link>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <>
          {list?.map((product) => {
            return (
              <div
                key={cart ? product.product.id : product._id}
                className="shadow-xl mb-5 p-5"
              >
                <div className="flex items-center">
                  <Image
                    width={110}
                    height={90}
                    src={cart ? product.product.imageCover : product.imageCover}
                    alt="product image"
                  />
                  <div className="flex items-center justify-between flex-grow">
                    <div className="ps-5 mt-2">
                      <p className="text-gray-500 font-semibold text-lg">
                        {cart
                          ? product?.product?.title
                              ?.split(" ")
                              .slice(0, 4)
                              .join(" ")
                          : product?.title?.split(" ").slice(0, 4).join(" ")}
                      </p>
                      <p className="text-green-600 font-semibold">
                        {product.price} EGP
                      </p>
                      {loading &&
                      (cart
                        ? stateId === product?.product?.id
                        : stateId === product._id) ? (
                        <div className="mt-2">
                          <LoadingSvg color={"text-red-500"} />
                        </div>
                      ) : (
                        <button
                          className="text-red-500 cursor-pointer mt-2"
                          onClick={() => {
                            removeProduct(
                              cart ? product.product.id : product._id
                            );
                          }}
                        >
                          <div className="flex">
                            <Trash />
                            Remove
                          </div>
                        </button>
                      )}
                    </div>

                    {cart ? (
                      <div className="flex gap-3 justify-center items-center">
                        <button
                          disabled={loading}
                          className=" rounded-lg px-3 py-2 min-w-[47.2px] min-h-[43.2px] border-green-600 border-2 cursor-pointer
                          disabled:opacity-75 
                          disabled:cursor-not-allowed
                         hover:bg-green-600 hover:text-white transition-all duration-200"
                          onClick={() => {
                            const quantity = product.count + 1;
                            UpdateQuantity(product.product._id, quantity);
                          }}
                        >
                          +
                        </button>
                        <p className="font-semibold">{product.count}</p>
                        <button
                          disabled={loading}
                          className="rounded-lg px-3.5 py-2 min-w-[47.2px] min-h-[43.2px] border-green-600 border-2 cursor-pointer
                           disabled:opacity-75 
                          disabled:cursor-not-allowed
                       hover:bg-green-600 hover:text-white transition-all duration-200"
                          onClick={() => {
                            if (product.count === 1)
                              removeProduct(product.product._id);
                            const quantity = product.count - 1;
                            UpdateQuantity(product.product._id, quantity);
                          }}
                        >
                          -
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-green-700 text-white px-4 py-2 rounded-xl 
                transition-all duration-300 cursor-pointer hover:bg-green-900"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ProductWishCart;
