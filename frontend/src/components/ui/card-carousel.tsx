"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SparklesIcon } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { Lock } from "lucide-react";

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 80%;
    height: 38rem;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  return (
    <section className="w-ace-y-4 overflow-hidden h-full">
      <style>{css}</style>
      <div className="flex w-full items-center justify-center gap-0 h-full">
        <div className="w-full h-full">
          <Swiper
            spaceBetween={70}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={showPagination}
            navigation={
              showNavigation
                ? {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }
                : undefined
            }
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="overflow-hidden"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="size-full rounded-4xl h-full relative overflow-hidden">
                  <Image
                    src={image.src}
                    width={500}
                    height={500}
                    className="size-full rounded-xl object-cover"
                    alt={image.alt}
                  />
                </div>
                <div className="absolute top-5 flex justify-between w-full px-5">
                  <Badge className="backdrop-blur-xs bg-[white]/15 rounded-full px-4 py-2 flex items-center gap-1">
                    <Crown className="w-4 text-[#FFEAC9]" />
                    Hosted by <strong>LETRYKA</strong>
                  </Badge>
                  <Badge className="backdrop-blur-xs bg-[white]/15 rounded-full flex items-center h-8 w-auto aspect-square">
                    <Lock strokeWidth={3} />
                  </Badge>
                </div>
                <div className="absolute w-full bottom-15 h-auto flex flex-col items-center gap-3 z-40">
                  <div className="w-full flex justify-center items-center gap-2">
                    <div className="w-8 h-auto aspect-square bg-[#A7FBE3] rounded-full mt-4"></div>
                    <div className="w-12 h-auto aspect-square bg-[#FFAEFE] rounded-full"></div>
                    <div className="w-8 h-auto aspect-square bg-[#D1FFA9] rounded-full mt-4"></div>
                  </div>
                  <p className="text-[var(--background)] font-extrabold text-4xl text-center px-14 leading-9 mt-1">
                    Typical girls night
                  </p>
                  <p className="text-[var(--background)]/50 text-sm text-center px-24">
                    19 May, 12pm Ulaanbaatar, kid100
                  </p>
                </div>
                <div className="absolute w-full bottom-0 h-3/5 z-0 bg-gradient-to-t from-[#202132]/90 to-[black]/0 rounded-4xl"></div>
              </SwiperSlide>
            ))}
            {/* {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <Image
                        src={image.src}
                        width={200}
                        height={200}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))} */}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
