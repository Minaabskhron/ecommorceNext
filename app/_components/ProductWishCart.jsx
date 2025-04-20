"use client";

import Link from "next/link";
import { useCart } from "../_context/CartContext";
import { useMemo } from "react";
import Item from "./Item";

const ProductWishCart = ({
  list,
  removeProduct,
  cart,
  loadingStates,
  normalLoading,
}) => {
  const { cartList } = useCart();

  const totalPrice = useMemo(
    () =>
      cartList?.reduce(
        (acc, product) =>
          Number(acc) + Number(product?.count) * Number(product?.price),
        0
      ),
    [cartList]
  );

  if (list?.length === 0 || !list) {
    return (
      <div
        className={`flex ${
          cart
            ? "flex-col text-center gap-20"
            : "justify-center items-center py-20"
        } `}
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
    );
  }

  return (
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
      {list?.map((product) => (
        <Item
          product={product}
          key={cart ? product.product.id : product._id}
          cart={cart}
          removeProduct={removeProduct}
          loadingStates={loadingStates}
          normalLoading={normalLoading}
        />
      ))}
      {cart && list && (
        <div className="flex flex-col">
          <button className="bg-green-700 rounded-lg py-2 mb-20 mt-3 text-white cursor-pointer hover:bg-green-800">
            checkout
          </button>
        </div>
      )}
    </>
  );
};

export default ProductWishCart;
