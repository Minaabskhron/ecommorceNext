import Image from "next/image";
import Modal from "./Modal";

const Category = ({ category }) => {
  return (
    <Modal modelItem={category}>
      <div className="p-4 rounded-xl group cursor-pointer">
        <div className=" w-full h-[300px] relative">
          <Image
            fill
            src={category.image}
            alt="product image"
            className="object-contain rounded-xl"
            sizes="300px , 490px"
          />
        </div>
        <div className="py-10 ps-2">
          <div className="text-center">
            <h3 className="font-medium text-xl text-gray-500 group-hover:text-green-700 transition-all duration-300  ">
              {category.name}
            </h3>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Category;
