import notfound from "@/public/notfound.svg";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="m-5 flex justify-between mx-10 items-center gap-20">
      <div>
        <h1 className="text-3xl font-semibold mb-10">
          Something’s wrong here…
        </h1>
        <p className="text-gray-500">
          We can’t find the page you’re looking for.
          <br /> Check out our help center or head back to home.
        </p>
        <div className="mt-10 flex gap-5 ">
          <button
            className=" text-white py-2 px-4 rounded-md bg-[#001e2b]
           hover:bg-gray-700 transition duration-300 cursor-pointer"
          >
            Help Center
          </button>
          <Link
            href="/"
            className="bg-green-600 text-white py-2 px-4 rounded-md
           hover:bg-green-800 transition duration-300 cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <div>
        <Image src={notfound} alt="" />
      </div>
    </div>
  );
};

export default NotFound;
