"use client";

import Header from "@/components/Header";
import Hero from "./_components/Hero";

const Home = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        <Header />
        <Hero />
      </div>
    </>
  );
};

export default Home;
