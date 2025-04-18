"use client";

import Heart from "../_svg/Heart";
import LoadingSvg from "../_svg/LoadingSvg";
import { useWishList } from "../_context/WishListContext";
import HeartFiled from "../_svg/HeartFiled";

const AddToWishlist = ({ id }) => {
  const { sendWishList, loading, stateId, wishList } = useWishList();

  const isInWishList = wishList?.data?.some((item) => item._id === id);

  return (
    <div
      onClick={() => {
        sendWishList(id);
      }}
    >
      {stateId === id && loading ? (
        <LoadingSvg />
      ) : isInWishList ? (
        <HeartFiled />
      ) : (
        <Heart color={"text-red-500"} />
      )}
    </div>
  );
};

export default AddToWishlist;
