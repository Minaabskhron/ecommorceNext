import Image from "next/image";
import Modal from "./Modal";

const Brand = ({ brand }) => {
  return (
    <Modal modelItem={brand}>
      <div className="p-4 rounded-xl cursor-pointer">
        <div className="grid place-items-center">
          <div className="w-[250px] h-[250px] relative ">
            <Image
              fill
              className="object-contain"
              src={brand.image}
              alt="product image"
              sizes="250px,250px"
            />
          </div>
        </div>

        <div className="pt-2 ps-2">
          <h3 className="font-medium text-green-600 ">{brand.name}</h3>
        </div>
      </div>
    </Modal>
  );
};

export default Brand;
