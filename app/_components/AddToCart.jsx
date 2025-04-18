"use client";

import { useCart } from "../_context/CartContext";

const AddToCart = ({ id }) => {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
        addToCart(id);
      }}
      className="bg-green-700 text-white px-20 py-2 rounded-xl 
    opacity-0 translate-y-4 transition-all duration-300 
    group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer
    hover:bg-green-900"
    >
      Add to cart
    </button>
  );
};

export default AddToCart;
