import Star from "@/app/_svg/Star";
import { baseUrl } from "@/app/_lib/const";

import AddToCart from "@/app/_components/AddToCart";
import AddToWishlist from "@/app/_components/AddToWishlist";
import ImagesCarousel from "@/app/_components/ImagesCarousel";
import NotFound from "@/app/not-found";

const page = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${baseUrl}/api/v1/products/${id}`);

  if (!res.ok) return <NotFound />;

  const { data } = await res.json();

  return (
    <div className="p-10 flex flex-col sm:flex-row gap-20 items-center ">
      <ImagesCarousel images={data.images} />
      <div className="flex-grow  sm:text-left mt-10 sm:mt-0">
        <h2 className="text-3xl font-semibold mb-3">{data.title}</h2>
        <p className="font-semibold">{data.description}</p>
        <h3 className="text-xl font-semibold my-2 text-green-700">
          {data.category.name}
        </h3>
        <div className="flex justify-between items-center sm:px-10 md:px-15 lg:px-20">
          <p> {data.price} EGP</p>
          <div className="flex">
            <Star />
            <p>{data.ratingsAverage}</p>
          </div>
          <div className="min-w-[32px] min-h-[32px] flex justify-center items-center">
            <AddToWishlist id={id} />
          </div>
        </div>
        <div className="pt-5">
          <AddToCart
            id={id}
            singleProduct="singleProduct"
            disabled={"disabled"}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
