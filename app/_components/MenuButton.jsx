"use client";
import { useState } from "react";
import MenuButtonSvg from "../_svg/MenuButtonSvg";

const MenuButton = () => {
  const [open, setOpen] = useState("hidden");
  return (
    <div className="sm:hidden flex ">
      <div
        className="border p-1 rounded-md border-green-600 cursor-pointer"
        onClick={() => {
          if (open === "hidden") {
            setOpen("");
            return;
          }

          setOpen("hidden");
        }}
      >
        <MenuButtonSvg />
      </div>
      <ul
        className={`${open} absolute bg-[#eee] top-9 w-full flex flex-col pt-6 gap-2`}
      >
        <li>Home</li>
        <li>Products</li>
        <li>Brands</li>
        <li>Categories</li>
      </ul>
    </div>
  );
};

export default MenuButton;
