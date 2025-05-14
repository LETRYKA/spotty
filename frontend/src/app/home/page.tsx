"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { DockComp } from ".@/components/Dock";
import { CardCarousel } from "./_components/Carousel";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import SplitText from "@/components/SplitText";
import { TextReveal } from "@/components/magicui/text-reveal";
import { SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import HoverExpand from "@/components/ui/hover-expand";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextAnimate } from "@/components/magicui/text-animate";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { motion } from "framer-motion";
import RandomLetterSwapForward from "@/fancy/components/text/random-letter-swap-forward-anim";
import RandomLetterSwapPingPong from "@/fancy/components/text/random-letter-swap-pingpong-anim";

const Home = () => {
  const images = [
    "https://i.pinimg.com/736x/90/d2/f8/90d2f89f801fd0c24f805eb5635c8d7d.jpg",
    "https://i.pinimg.com/736x/b2/87/a4/b287a469a347841c64ccd216f0e0d4d5.jpg",
    "https://i.pinimg.com/736x/3e/2a/25/3e2a2515f6649d2692f316c5de1baf9f.jpg",
    "https://i.pinimg.com/736x/6f/4a/7c/6f4a7cdcb6acff58f31094d2270c8a4a.jpg",
    "https://i.pinimg.com/736x/d5/50/ed/d550ed22cb277d9c17c9efe6278314f4.jpg",
    "https://i.pinimg.com/736x/34/9d/45/349d45d4bb3e76c72a4475b9163de5cc.jpg",
    "https://i.pinimg.com/736x/82/e0/55/82e055f41dd61aa05126563a7a4d7040.jpg",
    "https://i.pinimg.com/736x/bb/85/13/bb8513dbe82d7a0770c1878be6e0234c.jpg",
  ];

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center bg-black p-4 relative">
      <ScrollProgress className="top-0" />
      <DockComp />
      <div className="w-full h-[64rem] bg-[#F8F7F5] rounded-3xl overflow-hidden relative">
        <div className="w-full absolute top-0 flex justify-center items-start z-10">
          <p className="text-[500px] font-extrabold text-[var(--background)]/100 -mt-70">
            SPOTTY
          </p>
        </div>
        <div className="w-full flex justify-between items-center z-30 relative p-10 px-40">
          <p className="font-bold text-xl text-black">Spotty.</p>
          <div className="flex gap-4">
            <SignedOut>
              <div className="bg-[var(--background)] hover:bg-[var(--background)]/90 rounded-full py-2 px-6 font-medium cursor-pointer transition-all">
                <SignInButton />
              </div>
              <div className="bg-[var(--background)] hover:bg-[var(--background)]/90 rounded-full py-2 px-6 font-medium cursor-pointer transition-all">
                <SignUpButton />
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>
        </div>
        <div className="w-full relative z-30">
          <CardCarousel
            autoplayDelay={80000}
            showPagination={true}
            showNavigation={true}
          />
        </div>
        <Link href={`/auth/sign-up`}>
          <InteractiveHoverButton className="absolute right-14 bottom-10 z-40">
            Эхлэх
          </InteractiveHoverButton>
        </Link>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/bg-vid.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="w-full h-auto mt-20 overflow-hidden relative">
        <img
          src="/bg-pattern.avif"
          alt="Background Pattern"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0 pointer-events-none
      [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]
      [--webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]"
        />
        <div className="relative z-10 w-full px-6 md:px-20 mt-30 flex flex-col justify-center items-center gap-4">
          <SplitText
            tag="p"
            className="text-4xl md:text-6xl font-extrabold text-[var(--background)] text-center"
          >
            Everything you need
          </SplitText>
          <SplitText
            tag="p"
            className="text-base md:text-lg font-medium text-[var(--background)]/50 text-center max-w-md"
          >
            Designed to keep up with how you actually want and built on your
            personal experience.
          </SplitText>
          <div className="flex gap-4">
            <Link href={`/auth/sign-in`}>
              <Button className="py-5 px-7 rounded-full">Sign in</Button>
            </Link>
            <Link href={`/auth/sign-up`}>
              <Button className="py-5 px-7 rounded-full dark">Sign up</Button>
            </Link>
          </div>
        </div>
        <div className="relative z-20 w-full px-6 md:px-90 mt-30">
          <div
            className="w-full h-auto aspect-[14/11] bg-center bg-cover bg-[url(/Map.png)]
        rounded-4xl border border-[var(--background)]/20
        [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]
        [--webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
          ></div>
        </div>
      </div>
      <TextReveal className="dark -mt-20">
        Spotty will change how you see things ✨.
      </TextReveal>
      <div className="w-full h-auto mt-20 overflow-hidden bg-[#F8F7F5] bg-top bg-cover bg-[url(/bg-pattern2.png)]">
        <article className="relative z-50 flex flex-col  items-center justify-center mt-30">
          <Badge
            variant="outline"
            className="mb-3 rounded-[14px] border border-black/10 bg-white text-base md:left-6"
          >
            <SparklesIcon className="  fill-[#EEBDE0] stroke-1 text-neutral-800" />{" "}
            find your taste
          </Badge>
          <SplitText
            tag="p"
            className="text-4xl md:text-6xl font-extrabold text-[var(--foreground)] text-center"
          >
            Explore events
          </SplitText>
        </article>
        <HoverExpand
          images={images}
          initialSelectedIndex={0}
          thumbnailHeight={200}
          modalImageSize={400}
          maxThumbnails={11}
        />
        <div className="w-full flex justify-center items-center gap-64 px-50 mt-30">
          <div>
            <div className="flex items-center -mb-3">
              <motion.img
                src={`/s-letter.png`}
                width={150}
                className="-ml-10"
                style={{ willChange: "transform" }}
                animate={{
                  y: ["0%", "-8%", "0%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3.5,
                  ease: [0.42, 0, 0.58, 1],
                  delay: 0.1,
                  times: [0, 0.5, 1],
                }}
              />
              <motion.img
                src={`/p-letter.png`}
                width={150}
                className="-ml-12"
                style={{ willChange: "transform" }}
                animate={{
                  y: ["0%", "8%", "0%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3.5,
                  ease: [0.42, 0, 0.58, 1],
                  delay: 0.2,
                  times: [0, 0.5, 1],
                }}
              />
              <motion.img
                src={`/t-letter.png`}
                width={150}
                className="-ml-12"
                style={{ willChange: "transform" }}
                animate={{
                  y: ["0%", "-6%", "0%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3.6,
                  ease: [0.42, 0, 0.58, 1],
                  delay: 0.3,
                  times: [0, 0.5, 1],
                }}
              />
            </div>
            <TextAnimate
              animation="blurIn"
              as="h1"
              className="w-70 text-xl font-semibold text-[var(--foreground)]/50 mt-5"
            >
              Spotty gives you a Figma-like design tool experience. But instead
              of designing a picture of a website that you need to rebuild
              later, what you design is the real thing. With all the styling and
              typography features you’d expect and more.
            </TextAnimate>
          </div>
          <div className="w-[34rem] h-auto aspect-10/11 bg-slate-400 rounded-3xl"></div>
        </div>
        <div className="w-full h-96 flex justify-center items-center mb-96">
          <TextAnimate
            animation="fadeIn"
            by="line"
            as="p"
            className="text-3xl font-semibold text-[var(--foreground)]/50 mt-5"
          >
            Rest of the page still on development
          </TextAnimate>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col justify-center items-center">
        <img
          src={`/footer.png`}
          className="object-cover w-full -mt-[55rem] z-0"
        />
        <div className="w-full h-96 bg-[#1E1E1E] z-30 flex flex-col justify-center items-start px-20">
          <div className="w-full flex justify-between items-start ">
            <TextAnimate
              animation="fadeIn"
              by="line"
              as="p"
              className="text-3xl font-semibold text-[var(--background)] mt-5"
            >
              Spotty.
            </TextAnimate>
            <div className="flex gap-16">
              <ul className="text-[var(--background)] text-left flex flex-col items-start">
                <li className="text-lg font-bold">Pages</li>
                <Link href={`/home`}>
                  <RandomLetterSwapPingPong
                    label="Home"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start mt-4"
                  />
                </Link>
                <Link href={`/location`}>
                  <RandomLetterSwapPingPong
                    label="Location"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
                <Link href={`/profile`}>
                  <RandomLetterSwapPingPong
                    label="Profile"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="Explore"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
              </ul>
              <ul className="text-[var(--background)] text-left flex flex-col items-start">
                <li className="text-lg font-bold">Resources</li>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="Services"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start mt-4"
                  />
                </Link>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="Decks"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="Orders"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="Chat"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
              </ul>
              <ul className="text-[var(--background)] text-left flex flex-col items-start">
                <li className="text-lg font-bold">Resources</li>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="Social"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start mt-4"
                  />
                </Link>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="Instagram"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="LinkedIn"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="Pinterest"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
                <Link href={`/#`}>
                  <RandomLetterSwapPingPong
                    label="Facebook"
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-all font-medium text-start"
                  />
                </Link>
              </ul>
            </div>
          </div>
          <div className="w-full h-px bg-[var(--background)]/15 my-6" />
          <div className="w-full flex justify-between items-center">
            <p className="text-[var(--background)]">
              All rights reserved | 2025 Spotty ©.
            </p>
            <p className="text-[var(--background)]">Terms & Condition</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
