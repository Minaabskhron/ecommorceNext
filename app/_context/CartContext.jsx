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

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stateId, setStateId] = useState(null);
  const [clearCartLoading, setClearCartLoading] = useState(false);
  const [removeProductLoading, setRemoveProductLoading] = useState(false);

  const router = useRouter();

  const token = session?.accessToken;

  const fetchCart = useCallback(
    async (url, options, loadingSetter = () => {}, getCartfetch) => {
      loadingSetter(true);
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        getCartfetch ? getCartfetch() : setCartList(data?.data?.products ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        loadingSetter(false);
        setStateId(null);
      }
    },
    [token]
  );

  const addToCart = async (id) => {
    setStateId(id);
    if (!token) {
      setStateId(null);
      setLoading(false);
      router.push("/signin");
      return;
    }
    await fetchCart(
      `${baseUrl}/api/v1/cart`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ productId: id }),
      },
      setLoading,
      getCart
    );
  };

  const getCart = useCallback(async () => {
    if (!token) {
      throw new Error("User is not authenticated");
    }
    await fetchCart(`${baseUrl}/api/v1/cart`, {
      headers: {
        token,
      },
    });
  }, [token, fetchCart]);
  useEffect(() => {
    if (status === "authenticated") getCart();
  }, [status, getCart]);

  const removeProduct = async (id) => {
    if (!token) {
      router.push("/signin");
      return;
    }

    await fetchCart(
      `${baseUrl}/api/v1/cart/${id}`,
      {
        method: "DELETE",
        headers: { token },
      },
      setRemoveProductLoading
    );
  };

  const UpdateQuantity = async (id, count) => {
    fetchCart(`${baseUrl}/api/v1/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ count }),
    });
  };

  const removeCart = async () => {
    await fetchCart(
      `${baseUrl}/api/v1/cart`,
      {
        method: "DELETE",
        headers: { token },
      },
      setClearCartLoading
    );
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartList,
        loading,
        stateId,
        removeProduct,
        UpdateQuantity,
        removeCart,
        clearCartLoading,
        removeProductLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("context used outside of the provider");
  return context;
};

export { CartProvider, useCart };
