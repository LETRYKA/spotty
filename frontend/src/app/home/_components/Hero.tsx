import Floating, {
  FloatingElement,
} from "@/fancy/components/image/parallax-floating";
import Link from "next/link";
import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import { Navigation } from "lucide-react";

const Hero = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    );
  }, []);

  return (
    <div
      className="flex w-dvw h-dvh justify-center items-center bg-black overflow-hidden"
      ref={scope}
    >
      <motion.div
        className="z-40 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl z-40 text-white font-semibold">
          Explore the world
        </p>
        <Link href={`/auth/sign-up`}>
          <button className="mt-4 relative inline-flex h-12 w-36 hover:w-44 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-0 group transition-all duration-200 ease-in-out">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <Navigation
                width={16}
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
              />
              <p className="-ml-5 group-hover:ml-0 transition-all duration-200 ease-in-out">
                Join us now
              </p>
            </span>
          </button>
        </Link>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={`https://i.pinimg.com/736x/24/04/cf/2404cfc2953f270ae5a707ef589aff29.jpg`}
            className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[10%] left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={`https://i.pinimg.com/736x/24/04/cf/2404cfc2953f270ae5a707ef589aff29.jpg`}
            className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[2%] left-[53%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={`https://i.pinimg.com/736x/24/04/cf/2404cfc2953f270ae5a707ef589aff29.jpg`}
            className="w-28 h-40 md:w-40 md:h-52 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[0%] left-[83%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={`https://i.pinimg.com/736x/24/04/cf/2404cfc2953f270ae5a707ef589aff29.jpg`}
            className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[40%] left-[2%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={`https://i.pinimg.com/736x/24/04/cf/2404cfc2953f270ae5a707ef589aff29.jpg`}
            className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[70%] left-[77%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={`https://i.pinimg.com/736x/24/04/cf/2404cfc2953f270ae5a707ef589aff29.jpg`}
            className="w-28 h-28 md:w-36 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="top-[73%] left-[15%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={`https://i.pinimg.com/736x/24/04/cf/2404cfc2953f270ae5a707ef589aff29.jpg`}
            className="w-40 md:w-52 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[80%] left-[50%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={`https://i.pinimg.com/736x/24/04/cf/2404cfc2953f270ae5a707ef589aff29.jpg`}
            className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
      </Floating>
    </div>
  );
};

export default Hero;
