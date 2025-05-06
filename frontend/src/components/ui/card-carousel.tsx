"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SparklesIcon } from "lucide-react"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

import { Badge } from "@/components/ui/badge"
import { Crown } from 'lucide-react';
import { Lock } from 'lucide-react';

interface CarouselProps {
  images: { src: string; alt: string }[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
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
    width: 300px;
    /* height: 600px; */
    /* margin: 20px; */
    height: 600px;
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
  `
  return (
    <section className="w-ace-y-4 overflow-hidden h-full">
      <style>{css}</style>
          <div className="flex w-full items-center justify-center gap-4 h-full">
            <div className="w-full h-full">
              <Swiper
                spaceBetween={50}
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
                    <div className="size-full rounded-3xl h-full relative overflow-hidden">
                      <Image
                        src={image.src}
                        width={500}
                        height={500}
                        className="size-full rounded-xl object-cover"
                        alt={image.alt}
                      />
                    </div>
                    <div className="absolute top-4 left-4 flex justify-between w-full">
                      <Badge className="backdrop-blur-sm bg-[white]/15 text-white rounded-full px-3 py-1 flex items-center gap-1">
                        <Crown  className="w-4 h-4" />
                        Hosted by LETRYKA
                      </Badge>
                      <Lock />
                    </div>
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
  )
}
