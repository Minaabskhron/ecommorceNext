"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { baseUrl } from "../_lib/const";
import { useSession } from "next-auth/react";

//1-asm alcontext capital
const CartContext = createContext();

//2-asm alprovider capital
const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [cartList, setCartList] = useState(null);

  const token = session?.accessToken;

  const addToCart = async (id) => {
    if (!token) {
      router.push("/signin");
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/api/v1/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ productId: id }),
      });
      const data = await res.json();
    } catch (error) {}
  };

  const getCart = useCallback(async () => {
    if (!token) {
      throw new Error("User is not authenticated");
    }
    try {
      const res = await fetch(`${baseUrl}/api/v1/cart`, {
        headers: {
          token,
        },
      });

      const data = await res.json();
      setCartList(data);
    } catch (error) {}
  });
  useEffect(() => {
    if (status === "authenticated") getCart();
  }, [status]);

  return (
    //hna alvalues aly 3aizen ntl3ha
    <CartContext.Provider value={{ addToCart, cartList }}>
      {children}
    </CartContext.Provider>
  );
};

//3- asm alfunction aly htgeb mnha alvalues
const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("context used outside of the provider");
  return context;
};

//bn7ot alprovider w alfunction bta3t alvalues
export { CartProvider, useCart };
