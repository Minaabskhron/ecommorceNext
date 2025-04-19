import Heart from "@/app/_svg/Heart";
import Star from "@/app/_svg/Star";
import { baseUrl } from "@/app/_lib/const";
import Image from "next/image";
import AddToCart from "@/app/_components/AddToCart";

const page = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${baseUrl}/api/v1/products/${id}`);

  if (!res.ok) throw new Error("failed to fetch products");

  const { data } = await res.json();

  return (
    <div className="p-10 flex gap-20 items-center ">
      <Image
        src={data.images[0]}
        width={400}
        height={500}
        alt="product image"
      />
      <div className="flex-grow">
        <h2 className="text-3xl font-semibold mb-3">{data.title}</h2>
        <p className="font-semibold">{data.description}</p>
        <h3 className="text-xl font-semibold my-2 text-green-700">
          {data.category.name}
        </h3>
        <div className="flex justify-between px-20">
          <p> {data.price} EGP</p>
          <div className="flex">
            <Star />
            <p>{data.ratingsAverage}</p>
          </div>
          <Heart fill={"none"} color={"text-red-500"} />
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
