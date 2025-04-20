import Image from "next/image";
import Trash from "../_svg/Trash";
import LoadingSvg from "../_svg/LoadingSvg";
import { useCart } from "../_context/CartContext";
import AddToCart from "./AddToCart";
import { memo } from "react";

const Item = memo(
  ({ product, cart, removeProduct, loadingStates, normalLoading }) => {
    const { UpdateQuantity } = useCart();

    return (
      <div className="shadow-xl mb-5 p-5">
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
                  ? product?.product?.title?.split(" ").slice(0, 4).join(" ")
                  : product?.title?.split(" ").slice(0, 4).join(" ")}
              </p>
              <p className="text-green-600 font-semibold">
                {product.price} EGP
              </p>
              <div className="min-w-[116.26px] min-h-[35.2px] mt-2">
                {loadingStates[cart ? product?.product?.id : product._id] &&
                normalLoading ? (
                  <div className="flex items-center">
                    <LoadingSvg color={"text-red-500"} />
                  </div>
                ) : (
                  <button
                    className="text-red-500 cursor-pointer mt-2"
                    onClick={() => {
                      removeProduct(cart ? product.product.id : product._id);
                    }}
                  >
                    <div className="flex">
                      <Trash />
                      <p>Remove</p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {cart ? (
              <>
                <div className="flex gap-3 justify-center items-center">
                  <button
                    disabled={loadingStates[product?.product?._id]}
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
                    disabled={loadingStates[product?.product?.id]}
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
  }
);

export default Item;
