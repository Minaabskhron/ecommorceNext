"use client";

import { useCart } from "../_context/CartContext";
import LoadingSvg from "../_svg/LoadingSvg";
4;

const styles = {
  moving:
    "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 px-20 py-2 ",
  disabled:
    "disabled:cursor-not-allowed disabled:opacity-75 flex justify-center  min-h-[40px] px-20 py-2 ",
  singleProduct: "py-2",
};

const AddToCart = ({ id, moving, disabled, singleProduct }) => {
  const { addToCart, loading, stateId } = useCart();

  return (
    <button
      disabled={loading && stateId === id}
      onClick={() => {
        addToCart(id);
      }}
      className={`${
        loading && stateId === id
          ? styles[disabled]
          : styles[moving] || styles[singleProduct]
      }  bg-green-700 text-white  rounded-xl 
     cursor-pointer 
    hover:bg-green-900 w-full`}
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
