"use client";

import {
  Search,
  X,
  Sparkle,
  Clock,
  Heart,
  UserRound,
  House,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const MapWidgets = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(() => {
    const savedState = localStorage.getItem("sidebarState");
    return savedState ? JSON.parse(savedState) : true;
  });

  const handleSideBarControl = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(isSideBarOpen));
  }, [isSideBarOpen]);

  return (
    <>
      <div className="w-full h-screen flex items-center bg-gray-400 p-8">
        <div
          className={`h-full ${
            isSideBarOpen ? `w-[480px]` : `w-20`
          } flex flex-col gap-4 transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div className="w-full h-20 bg-[#0F0F11] rounded-full p-5 flex justify-between items-center">
            <div className="h-full flex items-center gap-3">
              <Button
                onClick={handleSideBarControl}
                className="rounded-full h-auto w-auto aspect-square bg-[#28272A] hover:bg-[#3c3a3f] transition-all"
              >
                <House />
              </Button>
              {isSideBarOpen && (
                <div className="h-full flex items-center">
                  <Button className="rounded-full h-auto w-auto aspect-square bg-[#94B8FF] hover:bg-[#3c3a3f] transition-all z-10">
                    <UserRound />
                  </Button>
                  <p className="bg-[#28272A] h-full pl-13 pr-5 rounded-full text-base text-[var(--background)] flex items-center -ml-10 z-0">
                    Username
                  </p>
                </div>
              )}
            </div>
            {isSideBarOpen && (
              <Button className="rounded-full h-full px-8 dark font-semibold">
                Share
              </Button>
            )}
          </div>
          <div className="w-full h-full bg-[#0F0F11] rounded-4xl flex flex-col justify-start items-center p-6 gap-4">
            {/* Searchbar */}
            {!isSideBarOpen && (
              <div
                onClick={handleSideBarControl}
                className="h-full flex justify-center items-center"
              >
                <ChevronRight
                  width={26}
                  className="stroke-[var(--background)] cursor-pointer"
                />
              </div>
            )}
            {isSideBarOpen && (
              <div className="w-full h-14 bg-[#28272A] rounded-full flex items-center p-1.5 hover:bg-[#28272A]/80 transition-all">
                <div className="h-full w-auto aspect-square rounded-full bg-[#0E0E10] flex justify-center items-center">
                  <Search stroke="white" width={17} />
                </div>
                <Input
                  type="search"
                  placeholder="Хайх"
                  className="outline-none border-none focus-visible:ring-transparent text-white text-base font-semibold"
                />
              </div>
            )}
            {/* Searchbar end */}
            {/* History */}
            {isSideBarOpen && (
              <div className="w-full flex items-center justify-start gap-3">
                <p className="bg-[#28272A] rounded-full py-1 px-3 text-[var(--background)]/50 text-xs font-light flex items-center gap-2 hover:bg-[#3c3a3f] transition-all cursor-pointer">
                  diddy <X width={14} />
                </p>
              </div>
            )}
            {/* End */}
            {/* Events */}
            {isSideBarOpen && (
              <div className="w-full flex items-center justify-between mt-5">
                <p className="text-xl text-[var(--background)]">Events</p>
                <Button className="rounded-full h-auto w-auto aspect-square bg-[#28272A] hover:bg-[#3c3a3f] transition-all">
                  <Sparkle />
                </Button>
              </div>
            )}
            <div className="w-full flex flex-col justify-start gap-5 mt-3 overflow-y-scroll pb-26">
              {isSideBarOpen &&
                Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-col justify-start gap-4"
                    >
                      <div className="w-full h-24 bg-[#1C1B20] rounded-2xl p-3 flex justify-between items-center hover:bg-[#26252c] transition-all">
                        <div className="h-full flex">
                          <div
                            className="h-full w-auto aspect-square rounded-2xl bg-cover bg-center"
                            style={{
                              backgroundImage: `url(https://e3.365dm.com/24/09/2048x1152/skynews-sean-diddy-combs-sean-combs_6688341.jpg)`,
                            }}
                          ></div>
                          <div className="h-full flex flex-col justify-center ml-4">
                            <p className="text-[var(--background)] font-semibold text-base">
                              Diddy after party
                            </p>
                            <p className="text-[var(--background)]/50 text-xs flex items-center">
                              @LETRYKA{" "}
                              <Clock
                                strokeWidth={2}
                                width={12}
                                className="ml-3 mr-1"
                              />{" "}
                              Starts at 11pm
                            </p>
                          </div>
                        </div>
                        <div className="h-full flex flex-col mr-1 items-end">
                          <Button className="bg-[#4B4AFE] h-auto aspect-square hover:bg-[#4B4AFE]/80 transition-all w-8">
                            <Heart strokeWidth={3} width={2} />
                          </Button>
                          <div className="flex items-center mt-4">
                            <div className="w-6 h-auto aspect-square rounded-full bg-slate-300 -ml-2"></div>
                            <div className="w-6 h-auto aspect-square rounded-full bg-slate-500 -ml-2"></div>
                            <div className="w-6 h-auto aspect-square rounded-full bg-slate-700 -ml-2"></div>
                            <p className="text-[var(--background)] ml-3 text-sm">
                              4/10
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            {/* End */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MapWidgets;
