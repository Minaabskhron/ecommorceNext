"use client";
import { useState } from "react";
import Close from "../_svg/Close";
import Image from "next/image";

const Modal = ({ children, modelItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setIsOpen((s) => !s);
        }}
      >
        {children}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white py-4 rounded-xl shadow-lg w-[600px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end px-4 pb-2">
              <button
                className="p-0.5 text-gray-500 hover:text-black hover:bg-gray-200 transition-all duration-300 rounded-sm "
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Close />
              </button>
            </div>
            <div className="flex justify-between items-center border-y border-y-gray-300 px-4">
              <div className="mt-8">
                <h2 className="text-5xl text-green-700 font-semibold mb-4">
                  {modelItem.name}
                </h2>
                <p className="text-gray-500 font-semibold ms-1">
                  {modelItem.slug}
                </p>
              </div>
              <div className="w-[250px] h-[300px] relative">
                <Image
                  fill
                  className="object-contain"
                  src={modelItem.image}
                  alt={`${modelItem} image`}
                  sizes="250 , 300"
                />
              </div>
            </div>
            <div className="flex justify-end items-center px-4 pb pt-3">
              <button
                className="px-4 py-2 text-white rounded-xl bg-green-700 
              hover:bg-green-900 transition-all duration-200 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
