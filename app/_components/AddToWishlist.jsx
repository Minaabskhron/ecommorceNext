"use client";
import { useState } from "react";
import { baseUrl } from "../_lib/const";
import Heart from "../_svg/Heart";
import { useSession } from "next-auth/react";

const AddToWishlist = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session } = useSession();
  const token = session?.accessToken;

  const sendWishList = async (id) => {
    try {
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

  return (
    <div
      onClick={() => {
        sendWishList(id);
      }}
    >
      {loading ? "" : <Heart color={"text-red-500"} />}
    </div>
  );
};

export default AddToWishlist;
