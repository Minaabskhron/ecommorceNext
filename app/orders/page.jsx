"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "../_context/CartContext";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const { cartList, removeCart } = useCart();

  const [order] = useState(cartList);
  const totalPrice = useMemo(
    () =>
      order?.reduce(
        (acc, product) =>
          Number(acc) + Number(product?.count) * Number(product?.price),
        0
      ),
    [cartList]
  );
  useEffect(() => {
    if (cartList.length > 0) removeCart();
  }, []);

  return (
    <div className=" mt-10 mx-25 ">
      {order.length === 0 ? (
        <div>
          <div className="flex justify-center gap-20 my-20">
            <p className="text-5xl font-semibold"> there is no orders yet</p>
          </div>
          <div className="flex text-center">
            <Link
              className="w-full bg-green-700 rounded-lg py-2 mb-20 text-white cursor-pointer hover:bg-green-800"
              href={"/products"}
            >
              Go To Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2 text-gray-600">{`Order done with a total price of ${totalPrice} EGP`}</h1>
          {order.map((product) => (
            <div key={product.product.id} className="shadow-xl mb-5 p-5">
              <div className="flex items-center">
                <Image
                  width={110}
                  height={90}
                  src={product.product.imageCover}
                  alt="product image"
                />
                <div className="flex items-center justify-between flex-grow">
                  <div className="ps-5 mt-2">
                    <p className="text-gray-500 font-semibold text-lg">
                      {product?.product?.title
                        ?.split(" ")
                        .slice(0, 4)
                        .join(" ")}
                    </p>
                    <p className="text-green-600 font-semibold">
                      {product.price} EGP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default page;
