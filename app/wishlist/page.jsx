"use client";
import ProductWishCart from "../_components/ProductWishCart";
import { useWishList } from "../_context/WishListContext";

const page = () => {
  const { wishList, stateId, normalLoading, removeProduct, loadingStates } =
    useWishList();

  return (
    <div className="mx-30">
      <div className="pt-10">
        <h1 className="text-3xl font-semibold mb-10 text-gray-500">
          Wishing List
        </h1>
        <ProductWishCart
          list={wishList?.data}
          stateId={stateId}
          removeProduct={removeProduct}
          normalLoading={normalLoading}
          loadingStates={loadingStates}
        />
      </div>
    </div>
  );
};

export default page;
