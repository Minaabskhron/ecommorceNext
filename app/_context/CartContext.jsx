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
import { useRouter } from "next/navigation";

//1-asm alcontext capital
const CartContext = createContext();

//2-asm alprovider capital
const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [cartList, setCartList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stateId, setStateId] = useState(null);
  const router = useRouter();

  const token = session?.accessToken;

  const addToCart = async (id) => {
    setLoading(true);
    setStateId(id);
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
      await getCart();
    } catch (error) {
      console.error("Cart Error:", error);
    } finally {
      setLoading(false);
      setStateId(null);
    }
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
      setCartList(data?.data?.products);
    } catch (error) {
      console.error("Cart Error:", error);
    }
  });
  useEffect(() => {
    if (status === "authenticated") getCart();
  }, [status, token]);

  const removeProduct = async (id) => {
    setLoading(true);
    setStateId(id);
    if (!token) {
      router.push("/signin");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/v1/cart/${id}`, {
        method: "DELETE",
        headers: { token },
      });
      const data = await res.json();
      setCartList(data?.data?.products);
    } catch (error) {
      console.error("Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const UpdateQuantity = async (id, count) => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/v1/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ count }),
      });
      const data = await res.json();
      setCartList(data.data.products);
    } catch (error) {
      console.error("Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/v1/cart`, {
        method: "DELETE",
        headers: { token },
      });

      const data = await res.json();
      setCartList(null);
    } catch (error) {
      console.error("Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    //hna alvalues aly 3aizen ntl3ha
    <CartContext.Provider
      value={{
        addToCart,
        cartList,
        loading,
        stateId,
        removeProduct,
        UpdateQuantity,
        removeCart,
      }}
    >
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
