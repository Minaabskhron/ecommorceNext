"use client";
import { useCart } from "../_context/CartContext";
import ProductWishCart from "../_components/ProductWishCart";

const page = () => {
  const { cartList, removeProduct, loading, stateId } = useCart();
  return (
    <div className="mx-30 pt-10">
      <h1 className="text-3xl font-semibold mb-10 text-gray-500">
        Shopping Cart
      </h1>
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
