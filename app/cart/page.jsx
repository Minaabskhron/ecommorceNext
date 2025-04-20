"use client";
import { useCart } from "../_context/CartContext";
import ProductWishCart from "../_components/ProductWishCart";
import LoadingSvg from "../_svg/LoadingSvg";

const page = () => {
  const { cartList, removeProduct, loadingStates, removeCart, normalLoading } =
    useCart();

  return (
    <div className="mx-30 pt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold mb-10 text-gray-500">
          Shopping Cart
        </h1>
        {cartList?.length > 0 && (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg
            cursor-pointer hover:bg-red-700 transition-all duration-200
            min-w-[85.61px] min-h-[41px] flex justify-center items-center"
            onClick={() => {
              removeCart();
            }}
          >
            {normalLoading && Object.values(loadingStates)[0] === false ? (
              <LoadingSvg />
            ) : (
              "clear all"
            )}
          </button>
        )}
      </div>
      <ProductWishCart
        list={cartList}
        cart={"cart"}
        removeProduct={removeProduct}
        loadingStates={loadingStates}
        normalLoading={normalLoading}
      />
    </div>
  );
};

export default page;
