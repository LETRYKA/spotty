"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, CircleCheck, Pencil, Share, User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Event } from "@/types/Event";
import DropDown from "./Menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EventDisplayLayoutProps {
  event: Event;
  joined: boolean;
  onJoin: () => void;
  onLeave: () => void;
}

export const EventDisplayLayout = ({
  event,
  joined,
  onJoin,
  onLeave,
}: EventDisplayLayoutProps) => {
  return (
    <>
      <h2 className="text-2xl text-[var(--background)] font-bold mt-3 px-8">
        {event.title}
      </h2>
      <p className="text-sm text-[var(--background)]/50 w-44 px-8">
        {new Date(event.startAt).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
      <div className="w-full flex justify-center gap-3 mt-2 px-8">
          {joined ? (
            <>
              <Button className="bg-[#0278FC] hover:bg-[#0277fcdc] w-2/4 text-white rounded-2xl py-8 flex flex-col gap-0 text-base hover:scale-105 transition-all">
                <CircleCheck strokeWidth={3} />
                Going
              </Button>
              <Button
                onClick={onLeave}
                className="bg-[var(--background)]/10 hover:bg-[var(--background)]/15 w-2/4 text-white/50 rounded-2xl py-8 flex flex-col gap-0 text-base hover:scale-105 transition-all"
              >
                <CircleCheck strokeWidth={3} />
                Not going
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onJoin}
                className="bg-[var(--background)]/10 hover:bg-[var(--background)]/15 w-2/4 text-white/50 rounded-2xl py-8 flex flex-col gap-0 text-base hover:scale-105 transition-all"
              >
                <CircleCheck strokeWidth={3} />
                Join
              </Button>
              <Button
                disabled
                className="w-2/4 text-white/20 rounded-2xl py-8 flex flex-col gap-0 text-base transition-all border border-white/10 cursor-not-allowed"
              >
                <CircleCheck strokeWidth={3} />
                Not going
              </Button>
            </>
          )}
      </div>
      <div className="w-full flex justify-start bg mt-2 pl-6">
        <div className="w-full">
          <Carousel>
            <CarouselContent className="flex gap-5">
              {event.galleryImages.map((gallery, index) => (
                <CarouselItem key={index} className="basis-3/5 py-4">
                  <div
                    className="flex aspect-6/7 items-center justify-center p-7 bg-cover bg-center rounded-3xl cursor-pointer hover:scale-105 transition-all"
                    style={{
                      backgroundImage: `url(${gallery})`,
                    }}
                  ></div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="flex flex-col justify-start px-8">
        <h2 className="text-lg text-[var(--background)] font-bold">About</h2>
        <div className="w-full bg-[#0E1217] border-1 border-[#2F2F2F] rounded-2xl p-5 mt-2">
          <p className="text-[var(--background)] text-sm leading-6">
            {event.description}
          </p>
        </div>
        <div className="w-full mt-6 flex flex-wrap justify-start items-center gap-3">
          {event.categories &&
            event.categories.map((category, index) => (
              <p
                key={index}
                className="w-fit text-[var(--background)] bg-[#D9D9D9]/10 text-sm px-4 py-2 rounded-full"
              >
                {category?.emoji} {category?.name}
              </p>
            ))}
        </div>
        <div className="w-full flex justify-between mt-8">
          <h2 className="text-lg text-[var(--background)] font-bold">
            Guest list {event.participants.length || 0}/
            {event.participantLimit || 0}
          </h2>
          <p className="text-base text-[#F45B69]">
            {event.participantLimit &&
            event.participants.length >= event.participantLimit
              ? "Full"
              : ""}
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 mt-5">
          {event.participants.map((participant, index) => (
            <div
              key={index}
              className="w-full p-3 bg-[#D9D9D9]/10 hover:bg-[#D9D9D9]/15 flex justify-between items-center rounded-2xl transition-all"
            >
              <div className="flex h-12 gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={participant.avatarImage?.trim() || ""}
                    alt={participant.name}
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>

                <div className="h-full flex flex-col justify-center items-start">
                  <p className="text-[var(--background)] text-base font-bold">
                    {participant.name}
                  </p>
                  <p className="text-[var(--background)]/50 text-sm -mt-1">
                    {participant.moodStatus}
                  </p>
                </div>
              </div>
              <DropDown participant={participant} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
