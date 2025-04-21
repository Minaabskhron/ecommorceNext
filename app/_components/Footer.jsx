import Image from "next/image";
import amazon from "@/public/amazonpay.svg";
import americanExpress from "@/public/american-express.svg";
import masterCard from "@/public/mastercard.svg";
import paypal from "@/public/paypal.svg";
import visa from "@/public/visa.svg";
import googleplay from "@/public/googleplay.svg";
import applestore from "@/public/applestore.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#eee] pt-10 p-5 text-gray-500 absloute bottom-0 left-0 right-0">
      <h3 className="text-black text-2xl mb-2">Get The FreshCart App</h3>
      <p>We will send you a link, open it on your phone to download the app.</p>
      <div className="sm:flex mt-5 gap-3 justify-center items-center border-b pb-6 border-b-gray-300">
        <input
          type="text"
          placeholder="Email..."
          className="text-black w-full mt-5 sm:mt-0 sm:w-fit flex-grow border border-gray-300 rounded-xl bg-white p-1 ps-3
         focus:outline-none "
        />
        <button className="bg-green-600 w-full mt-5 sm:mt-0 sm:w-fit text-white px-3 py-1 rounded-xl">
          Share App Link
        </button>
      </div>
      <div className="flex justify-center lg:block">
        <div className="lg:flex justify-between border-b pb-6 border-b-gray-300 pt-6">
          <div className="flex mb-2 lg:mb-0">
            <p className="text-black me-2 font-semibold">Payment Partners</p>
            <ul className="flex gap-2">
              <li>
                <Link href="#">
                  <Image src={amazon} alt="amazon" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Image src={americanExpress} alt="american express" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Image src={masterCard} alt="master card" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Image src={paypal} alt="paypal" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Image src={visa} alt="visa" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:flex items-center">
            <p className="font-semibold mb-2 lg:mb-0 text-black me-4 text-center">
              Get deliveries with FreshCart
            </p>
            <ul className="flex gap-2">
              <li>
                <Link href="#">
                  <Image src={googleplay} alt="googleplay" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Image src={applestore} alt="applestore" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
