"use client";

import { memo } from "react";
import { useCart } from "../_context/CartContext";
import LoadingSvg from "../_svg/LoadingSvg";

const styles = {
  moving:
    "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300  ",
  disabled:
    "disabled:cursor-not-allowed disabled:opacity-75 flex justify-center  min-h-[40px] items-center ",
  singleProduct: "py-2",
  wishListProduct: "h-full px-0 py-0",
};

const AddToCart = ({
  id,
  moving,
  disabled,
  singleProduct,
  wishListProduct,
}) => {
  const { addToCart, loadingStates } = useCart();

  const modeClass = loadingStates[id]
    ? styles[disabled]
    : styles[moving] || styles[singleProduct] || styles[wishListProduct];

  const className = `${modeClass} bg-green-700 text-white  rounded-xl 
     cursor-pointer 
    hover:bg-green-900 w-full min-h-[40px]`;

  return (
    <button
      disabled={loadingStates[id]}
      onClick={() => {
        addToCart(id);
      }}
      className={className}
    >
      {loadingStates[id] ? <LoadingSvg color={"text-white"} /> : "Add to cart"}
    </button>
  );
};

export default memo(AddToCart);
