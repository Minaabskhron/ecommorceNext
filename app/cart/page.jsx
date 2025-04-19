"use client";
import { useCart } from "../_context/CartContext";
import ProductWishCart from "../_components/ProductWishCart";
import LoadingSvg from "../_svg/LoadingSvg";

const page = () => {
  const { cartList, removeProduct, loading, stateId, removeCart } = useCart();
  return (
    <div className="mx-30 pt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold mb-10 text-gray-500">
          Shopping Cart
        </h1>
        {cartList?.length > 0 && (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg
            cursor-pointer hover:bg-red-700 transition-all duration-200
            min-w-[85.61px] min-h-[41px] flex justify-center items-center"
            onClick={removeCart}
          >
            {loading ? <LoadingSvg /> : "clear all"}
          </button>
        )}
      </div>
      <ProductWishCart
        list={cartList}
        cart={"cart"}
        removeProduct={removeProduct}
        loading={loading}
        stateId={stateId}
      />
      {/* {cartList?.data?.products?.length === 0 ? (
        <div className="flex flex-col text-center">
          <h2 className="text-5xl font-semibold my-20">Your Cart Is Empty</h2>
          <Link
            className="w-full bg-green-700 rounded-lg py-2 mb-20 text-white cursor-pointer hover:bg-green-800"
            href={"/products"}
          >
            Go To Shopping
          </Link>
        </div>
      ) : (
        <>
          {cartList?.data.products.map((product) => (
            <div key={product.product._id}>
              <p>{product.product.title.split(" ").slice(0, 4).join(" ")}</p>
            </div>
          ))}
        </>
      )} */}
    </div>
  );
};

export default page;
