"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { baseUrl } from "../_lib/const";
import { useRouter } from "next/navigation";

const WishListContext = createContext();

const WishListProvider = ({ children }) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stateId, setStateId] = useState(null);

  const token = session?.accessToken;

  const getWishList = useCallback(async () => {
    if (!token) {
      throw new Error("User is not authenticated");
    }
    try {
      const WishlistRes = await fetch(`${baseUrl}/api/v1/wishlist`, {
        headers: { token },
      });

      if (!WishlistRes.ok)
        throw new Error(WishlistRes.message || "failed to fetch wishlist");

      const wishListData = await WishlistRes.json();

      setWishList(wishListData);
    } catch (error) {
      console.error("Error loading wishlist:", error.message);
    }
  });

  useEffect(() => {
    if (status === "authenticated") getWishList();
  }, [status]);

  const removeProduct = async (id) => {
    setLoading(true);
    setStateId(id);
    try {
      const res = await fetch(`${baseUrl}/api/v1/wishlist/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to remove product");

      setWishList((prev) => ({
        ...prev,
        data: prev.data.filter((item) => item._id !== id), //creates a new data array where the product with the given id is removed.
      }));
    } catch (error) {
      console.error("Error removing Product", error.message);
    } finally {
      setStateId(null);
      setLoading(false);
    }
  };

  const sendWishList = async (id) => {
    if (!token) {
      router.push("/signin");
      return;
    }

    setStateId(id);
    setLoading(true);
    const isInWishList = wishList?.data?.some((product) => product._id === id);

    if (isInWishList) {
      await removeProduct(id);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/v1/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ productId: id }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.message || "can't add it to the wishlist try again later"
        );
      await getWishList();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //hna allogic
  return (
    //hna alvalues aly 3aizen ntl3ha
    <WishListContext.Provider
      value={{
        wishList,
        sendWishList,
        loading,
        stateId,
        removeProduct,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) throw new Error("context used outside of the provider");
  return context;
};

//bn7ot alprovider w alfunction bta3t alvalues
export { WishListProvider, useWishList };
