"use client";

import Heart from "../_svg/Heart";
import LoadingSvg from "../_svg/LoadingSvg";
import { useWishList } from "../_context/WishListContext";
import HeartFiled from "../_svg/HeartFiled";

const AddToWishlist = ({ id }) => {
  const { sendWishList, normalLoading, stateId, wishList } = useWishList();

  const isInWishList = wishList?.data?.some((item) => item._id === id);

  return (
    <div
      onClick={() => {
        sendWishList(id);
      }}
    >
      {stateId === id && normalLoading ? (
        <LoadingSvg color={"text-red-500"} />
      ) : isInWishList ? (
        <HeartFiled />
      ) : (
        <Heart color={"text-red-500"} />
      )}
    </div>
  );
};

export default AddToWishlist;
