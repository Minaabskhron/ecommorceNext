"use client";

import Image from "next/image";
import Trash from "../_svg/Trash";
import LoadingSvg from "../_svg/LoadingSvg";
import Link from "next/link";
import { useCart } from "../_context/CartContext";
import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";

const ProductWishCart = ({ list, stateId, removeProduct, loading, cart }) => {
  const { UpdateQuantity, cartList } = useCart();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!loading && clicked) setClicked(false);
  }, [clicked, loading]);

  const totalPrice = cartList?.reduce(
    (acc, product) =>
      Number(acc) + Number(product?.count) * Number(product?.price),
    0
  );
  return (
    <div>
      {list?.length === 0 || !list ? (
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
            {cart && (
              <Link
                className="w-full bg-green-700 rounded-lg py-2 mb-20 text-white cursor-pointer hover:bg-green-800"
                href={"/products"}
              >
                Go To Shopping
              </Link>
            )}
          </div>
        </>
      ) : (
        <>
          {cart && list && (
            <div className="flex justify-between text-gray-500 text-2xl">
              <p>
                Total price:
                <span className="text-green-600 font-semibold ms-2">
                  {totalPrice}
                </span>
              </p>
              <p>
                Total Number of Items
                <span className="text-green-600 font-semibold ms-2">
                  {cartList?.length}
                </span>
              </p>
            </div>
          )}
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
                        : stateId === product._id) &&
                      clicked ? (
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
                            setClicked(true);
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
                      <>
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
                      </>
                    ) : (
                      <div className="min-w-[113.75px] min-h-[40px] flex items-center">
                        <AddToCart
                          id={product._id}
                          wishListProduct={"wishListProduct"}
                          disabled={"disabled"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {cart && list && (
            <div className="flex flex-col">
              <button className="bg-green-700 rounded-lg py-2 mb-20 mt-3 text-white cursor-pointer hover:bg-green-800">
                checkout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductWishCart;
