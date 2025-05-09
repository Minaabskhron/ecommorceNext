import Image from "next/image";
import Link from "next/link";
import Star from "../_svg/Star";
import AddToWishlist from "./AddToWishlist";
import AddToCart from "./AddToCart";

const Product = ({ product }) => {
  return (
    <div className="p-4 rounded-xl group sm:min-h-[450px] md:min-h-[548px] lg:min-h-[590px]">
      <Link href={`/products/${product._id}`}>
        <div className="grid place-items-center">
          <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[390px] relative">
            <Image
              fill
              className="object-contain"
              src={product.imageCover}
              alt="product image"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
                <div className="sm:flex sm:gap-3">
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
        <div className="relative w-full me-8">
          <AddToCart id={product._id} disabled={"disabled"} moving={"moving"} />
        </div>
        <div className="min-w-[30px] min-h-[30px] flex justify-center items-center">
          <AddToWishlist id={product._id} />
        </div>
      </div>
    </div>
  );
};

export default Product;
