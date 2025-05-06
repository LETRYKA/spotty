import { CardCarousel } from "@/components/ui/card-carousel";
import one from "/public/1.avif";
import two from "/public/2.avif";
import three from "/public/3.avif";
import four from "/public/4.avif";
import five from "/public/5.avif";

const EventsCarousel = () => {
  const images = [
    { src: one.src, alt: "Image 1" },
    { src: two.src, alt: "Image 2" },
    { src: three.src, alt: "Image 3" },
    { src: four.src, alt: "Image 4" },
    { src: five.src, alt: "Image 5" },
  ];

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden mt-20">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  );
};

export default EventsCarousel;
