import Image from "next/image";
import Link from "next/link";
import Star from "../_svg/Star";
import Heart from "../_svg/Heart";

const Product = ({ product }) => {
  return (
    <div className="p-4 rounded-xl group ">
      <Link href={`/products/${product._id}`}>
        <div className="grid place-items-center">
          <div className="w-[290px] h-[390px] relative">
            <Image
              fill
              className="object-contain"
              src={product.imageCover}
              alt="product image"
              sizes="290px , 390px"
            />
          </div>
        </div>
        <div className="pt-2 ps-2">
          <div>
            <h3 className="font-medium text-green-600 ">
              {product.category.name}
            </h3>
            <p className="font-medium">
              {product.title.split(" ").slice(0, 4).join(" ")}
            </p>
          </div>
          <div className="flex items-center justify-between pt-3">
            <div>
              {product.priceAfterDiscount ? (
                <div className="flex gap-3">
                  <p className="line-through">{product.price} EGP</p>
                  <p>{product.priceAfterDiscount} EGP</p>
                </div>
              ) : (
                <p>{product.price} EGP</p>
              )}
            </div>
            <div className="flex justify-center items-center">
              <Star />
              <p className="ps-1">{product.ratingsAverage}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="ps-2 pt-3 flex items-center justify-between">
        <div className="relative">
          <button
            className="bg-green-700 text-white px-20 py-2 rounded-xl 
          opacity-0 translate-y-4 transition-all duration-300 
          group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer
          hover:bg-green-900"
          >
            Add to cart
          </button>
        </div>
        <Heart color={"text-red-500"} />
      </div>
    </div>
  );
};

export default Product;
