"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateField } from "../_lib/validateForm";
import Link from "next/link";

const page = () => {
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");

  const formData = { phone, city, details };

  const hasFormErrors = () => {
    return (
      Object.values(errors).some((error) => error && error !== "") ||
      phone === "" ||
      city === "" ||
      details === "" ||
      paymentMethod === ""
    );
  };
  const handleBlur = (fieldName) => {
    const error = validateField(fieldName, formData[fieldName], formData);
    setErrors((prev) => ({ ...prev, [fieldName]: error, back: "" }));
  };

  const onkeyUp = (value) => {
    if (errors[value] || errors.back) handleBlur(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    router.push("/orders");
  };
  return (
    <div className=" mt-10 mx-25 ">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-600">Checkout</h1>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex justify-between items-center">
            <label htmlFor="phone" className="block my-2 font-semibold text-sm">
              Phone
            </label>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <input
            onBlur={() => {
              handleBlur("phone");
            }}
            onKeyUp={() => {
              onkeyUp("phone");
            }}
            id="phone"
            placeholder="Phone"
            type="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />

          <div className="flex justify-between items-center">
            <label htmlFor="city" className="block my-2 font-semibold text-sm">
              City
            </label>
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <input
            onBlur={() => {
              handleBlur("city");
            }}
            onKeyUp={() => {
              onkeyUp("city");
            }}
            id="city"
            placeholder="Write your city..."
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />

          <div className="flex justify-between items-center">
            <label
              htmlFor="details"
              className="block my-2 font-semibold text-sm"
            >
              Details
            </label>
            {errors.details && (
              <p className="text-red-500 text-sm">{errors.details}</p>
            )}
          </div>

          <textarea
            onKeyUp={() => {
              onkeyUp("details");
            }}
            onBlur={() => {
              handleBlur("details");
            }}
            id="details"
            placeholder="Write Your Address Here..."
            type="text"
            name="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
          />

          <div className="flex items-center gap-3 text-green-600 font-semibold mb-5">
            <input
              id="cash"
              type="radio"
              name="payment"
              onChange={(e) => setPaymentMethod(e.target.value)}
              value="Cash payment"
            />
            <label htmlFor="cash">Cash payment</label>
          </div>
          <div className="flex items-center gap-3 text-green-600 font-semibold">
            <input
              id="online"
              type="radio"
              name="payment"
              onChange={(e) => setPaymentMethod(e.target.value)}
              value="Online payment"
            />
            <label htmlFor="online">Online payment</label>
          </div>
          <div className="flex text-center">
            <button
              disabled={hasFormErrors()}
              className="w-full mt-10 disabled:opacity-75 
          disabled:cursor-not-allowed bg-green-700 
          rounded-lg py-2 text-white cursor-pointer hover:bg-green-800"
            >
              {`Continue with ${paymentMethod}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
