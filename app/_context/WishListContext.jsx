"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "../_lib/const";

const WishListContext = createContext();

const WishListProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [stateId, setStateId] = useState(null);

  const getWishList = async () => {
    try {
      const token = session?.accessToken;
      setToken(token);
      if (!token) throw new Error("User is not authenticated");

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
  };

  useEffect(() => {
    if (status === "authenticated") getWishList();
  }, [status]);

  const sendWishList = async (id) => {
    try {
      setStateId(id);
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/v1/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ productId: id }),
      });

      const data = await res.json();
      setWishList(data);

      if (!res.ok) {
        setLoading(false);
        throw new Error(
          data.message || "can't add it to the wishlist try again later"
        );
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //hna allogic
  return (
    //hna alvalues aly 3aizen ntl3ha
    <WishListContext.Provider
      value={{ wishList, setWishList, sendWishList, loading, stateId }}
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
