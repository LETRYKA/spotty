"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Crown, Lock, Earth } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Event {
  id: string;
  title: string;
  owner: { name: string };
  startAt: string;
  isPrivate: boolean;
  backgroundImage: string;
}

interface CarouselProps {
  events: Event[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  onCardClick: (id: string) => void;
}
export const CardCarousel: React.FC<CarouselProps> = ({
  events,
  autoplayDelay = 2500,
  showPagination = true,
  showNavigation = true,
  onCardClick,
}) => {
  return (
    <section className="w-full h-full">
      <Swiper
        spaceBetween={70}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        effect={"coverflow"}
        grabCursor
        centeredSlides
        loop
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
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="overflow-hidden"
      >
        {events.map((event, index) => (
          <SwiperSlide key={event.id}>
            <div className="relative w-full h-[44rem] rounded-4xl overflow-hidden"
            onClick={() => onCardClick(event.id)}
            >  
              <Image
                src={event.backgroundImage || "/default-image.jpg"}
                alt={event.title}
                fill
                className="object-cover rounded-3xl"
              />
              {/* Overlay Top */}
              <div className="absolute top-5 w-full flex justify-between px-5 z-20">
                <Badge className="bg-white/10 backdrop-blur-sm px-4 py-2 flex items-center gap-2 text-white">
                  <Crown className="w-4 text-yellow-300" />
                  Hosted by <strong>{event.owner.name}</strong>
                </Badge>
                {event.isPrivate ? (
                  <Badge className="bg-white/10 backdrop-blur-sm h-8 w-8 flex items-center justify-center rounded-full text-white">
                    <Lock className="w-4" />
                  </Badge>
                ) : (
                  <div className="flex justify-center items-center">
                    <Earth className="w-4 text-[var(--background)] " strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Overlay Bottom */}
              <div className="absolute bottom-10 w-full z-20 flex flex-col items-center gap-2 text-white">
                <h2 className="text-3xl font-bold text-center px-10">
                  {event.title}
                </h2>
                <p className="text-sm text-center opacity-80 px-10">
                  {new Date(event.startAt).toLocaleString()}
                </p>
              </div>

              {/* Bottom Gradient */}
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10 rounded-b-3xl"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
