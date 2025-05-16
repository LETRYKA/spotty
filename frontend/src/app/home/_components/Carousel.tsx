"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FlipLink from "@/components/ui/text-effect-flipper";
import { Github } from "lucide-react";

interface CarouselProps {
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  autoplayDelay = 2500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  html, body {
    margin: 0;
    padding: 0;
  }

  .swiper {
    width: 100vw;
    height: auto;
    padding-left: 5vw;
    padding-right: 5vw;
    box-sizing: border-box;
    overflow: hidden;
  }

  .swiper-slide {
    width: 70vw;
    height: auto;
    display: flex;
    align-items: start;
    justify-content: center;
    border-radius: 24px;

    color: white;
    font-size: 1.5rem;
    padding: 2rem;
  }

  .swiper-3d .swiper-slide-shadow-left,
  .swiper-3d .swiper-slide-shadow-right {
    background: none;
  }
`;

  return (
    <section className="w-full h-auto z-50">
      <style>{css}</style>
      <Swiper
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView="auto"
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
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide className="h-full flex flex-col justify-center items-center tex-black">
          <div className="w-full group flex items-center justify-center -mt-20 text-black font-extrabold">
            <FlipLink href="https://x.com/guri_who font-extrabold">
              Meet
            </FlipLink>
          </div>
          <div className="w-full group flex items-center justify-center text-black font-extrabold">
            <FlipLink href="https://x.com/guri_who">Spotty</FlipLink>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <CardContainer className="w-full">
            <CardBody className="w-[45rem] h-auto aspect-10/6 bg-gradient-to-tr from-[#E6DAD5] to-[#E5D5ED] rounded-4xl relative bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
              <CardItem translateZ={30} className="absolute top-15 -right-20">
                <img src="/event-fire.png" className="w-50 -rotate-16" />
              </CardItem>
              <CardItem translateZ={30} className="absolute bottom-10 -left-34">
                <div className="w-60 h-28 rounded-3xl overflow-hidden">
                  <img
                    src="/event-ui.png"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </SwiperSlide>

        <SwiperSlide>
          <CardContainer className="w-full h-auto">
            <CardBody className="w-[28rem] h-auto aspect-4/5 bg-gradient-to-tr from-[#E6DAD5] to-[#E5D5ED] rounded-4xl relative bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1592753054398-9fa298d40e85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGljbmljfGVufDB8fDB8fHwy)]">
              <CardItem translateZ={30} className="absolute top-15 -right-20">
                <img src="/event-fire.png" className="w-50 -rotate-16" />
              </CardItem>
              <CardItem translateZ={30} className="absolute bottom-10 -left-20">
                <img src="/event-star.png" className="w-50 -rotate-16" />
              </CardItem>
            </CardBody>
          </CardContainer>
        </SwiperSlide>

        <SwiperSlide>
          <CardContainer className="w-full">
            <CardBody className="w-[34rem] h-auto aspect-square bg-gradient-to-tr from-[#E6DAD5] to-[#E5D5ED] rounded-full p-3 relative">
              <CardItem
                translateZ={10}
                className="w-full h-full rounded-full overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full object-cover rounded-full"
                />
              </CardItem>

              <CardItem translateZ={50} className="absolute top-15 -left-34">
                <div className="w-60 h-28 rounded-3xl overflow-hidden">
                  <img
                    src="/event-ui.png"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardItem>

              <CardItem translateZ={60} className="absolute bottom-0 -left-15">
                <img src="/event-heart.png" className="w-40 -rotate-16" />
              </CardItem>

              <CardItem translateZ={50} className="absolute -top-10 -right-10">
                <img src="/event-moon.png" className="w-50 -rotate-16" />
              </CardItem>

              <CardItem translateZ={70} className="absolute bottom-0 right-10">
                <div className="w-fit p-4 rounded-full bg-[var(--background)] flex justify-center items-center transition-all duration-300 ease-in-out">
                  <img src="/event-fire.png" className="w-24" />
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
