"use client";

import { useCart } from "../_context/CartContext";
import LoadingSvg from "../_svg/LoadingSvg";

const AddToCart = ({ id }) => {
  const { addToCart, loading, stateId } = useCart();

  return (
    <button
      disabled={loading && stateId === id}
      onClick={() => {
        addToCart(id);
      }}
      className={`${
        loading && stateId === id
          ? "disabled:cursor-not-allowed disabled:opacity-75 "
          : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      }  bg-green-700 text-white px-20 py-2 rounded-xl 
     cursor-pointer flex justify-center
    hover:bg-green-900 min-w-[250px] min-h-[40px] `}
    >
      {loading && stateId === id ? (
        <LoadingSvg color={"text-white"} />
      ) : (
        "Add to cart"
      )}
    </button>
  );
};

export default AddToCart;
