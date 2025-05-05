import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
const EventsCarousel = () => {
    return (
        <div className="w-full">
            <Carousel className=" flex justify-center items-center">
            <CarouselContent className="w-[360px] h-[650px] bg-red-500  rounded-4xl">
                <CarouselItem></CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </div>
    )
}
export default EventsCarousel;