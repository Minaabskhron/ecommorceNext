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

  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (productId, isLoading = false) => {
    setLoadingStates((prev) => ({
      ...prev,
      [productId]: isLoading,
    }));
  };

  const [normalLoading, setNormalLoading] = useState(false);

  const router = useRouter();

  const token = session?.accessToken;

  const fetchCart = useCallback(
    async (url, options, getCartfetch) => {
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        getCartfetch ? getCartfetch() : setCartList(data?.data?.products ?? []);
      } catch (error) {
        console.error(error);
      }
    },
    [token]
  );

  const addToCart = async (id) => {
    setLoading(id, true);
    if (!token) {
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

      getCart
    );
    setLoading(id, false);
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
    setLoading(id, true);
    setNormalLoading(true);
    if (!token) {
      router.push("/signin");
      return;
    }

    await fetchCart(`${baseUrl}/api/v1/cart/${id}`, {
      method: "DELETE",
      headers: { token },
    });
    setLoading(id, false);
    setNormalLoading(false);
  };

  const UpdateQuantity = async (id, count) => {
    setLoading(id, true);
    await fetchCart(`${baseUrl}/api/v1/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ count }),
    });
    setLoading(id, false);
  };

  const removeCart = async () => {
    setNormalLoading(true);
    await fetchCart(`${baseUrl}/api/v1/cart`, {
      method: "DELETE",
      headers: { token },
    });
    setNormalLoading(false);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartList,
        removeProduct,
        UpdateQuantity,
        removeCart,
        loadingStates,
        normalLoading,
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
