"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const ImagesCarousel = ({ images }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* feh mmkn t7ot brdo hna loop w 7aga asmaha navigation */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[400px] sm:h-[500px] w-full bg-gray-100 rounded-xl" // Added background and width
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`slide ${index + 1}`}
                fill
                className="object-contain rounded-xl"
                sizes="(max-width: 760px) 100vw, 80vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImagesCarousel;
