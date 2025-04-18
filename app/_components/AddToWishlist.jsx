"use client";

import Heart from "../_svg/Heart";
import LoadingSvg from "../_svg/LoadingSvg";
import { useWishList } from "../_context/WishListContext";

const AddToWishlist = ({ id }) => {
  const { sendWishList, loading, stateId } = useWishList();

  return (
    <div
      onClick={() => {
        sendWishList(id);
      }}
    >
      {stateId === id && loading ? (
        <LoadingSvg />
      ) : (
        <Heart color={"text-red-500"} />
      )}
    </div>
  );
};

export default AddToWishlist;
