import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";
import { CalendarHeart } from "lucide-react";

type DateTimePickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  touched?: boolean;
  error?: string;
};

export default function DateTimePicker({
  value,
  onChange,
  touched,
  error,
}: DateTimePickerProps) {
  const displayText = useMemo(() => {
    return value
      ? format(value, "MM/dd/yyyy hh:mm aa")
      : "Date Start Event";
  }, [value]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      date.setHours(value?.getHours() || 12, value?.getMinutes() || 0);
      onChange(date);
    }
  };

  const handleTimeChange = (type: "hour" | "minute" | "ampm", val: string) => {
    const currentDate = value || new Date();
    let newDate = new Date(currentDate);
    if (type === "hour") {
      const hour = parseInt(val, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(val, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (val === "AM" && hours >= 12) newDate.setHours(hours - 12);
      else if (val === "PM" && hours < 12) newDate.setHours(hours + 12);
    }
    onChange(newDate);
  };

  return (
    <div className="">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full bg-[#0D0D0D]/70 border-[#2F2F2F] py-5 rounded-xl text-left text-white flex justify-between",
              !value && "text-gray-400"
            )}
          >
            {displayText}
            <CalendarHeart />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full bg-[#0D0D0D] border-[#2F2F2F] z-50 text-white w-full min-w-xs flex items-center"
          align="start"
        >
          <div className="flex flex-col sm:flex-row w-full sm:max-w-[calc(100%-40px)] gap-4">
            {/* Calendar */}
            <div className="w-full sm:w-72 sm:max-w-xs overflow-x-auto">
              <Calendar
                mode="single"
                selected={value}
                onSelect={handleDateSelect}
                initialFocus
                className="bg-[#0D0D0D] text-white"
              />
            </div>
            {/* Time pickers */}
            <div className="flex sm:flex-row flex-col sm:h-[300px] divide-y sm:divide-x divide-[#2F2F2F] w-full">
              {/* Hour Scroll */}
              {/* Hour Scroll */}
              <ScrollArea className="w-full overflow-x-auto">
                <div className="flex jusify-start">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <Button
                      key={hour}
                      size="sm"
                      variant={
                        value && (value.getHours() % 12 || 12) === hour
                          ? "default"
                          : "ghost"
                      }
                      className=" bg-[#0D0D0D] hover:bg-[#1F1F1F] m-0 p-3"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
              </ScrollArea>

              {/* Minute Scroll */}
              <ScrollArea className="w-full overflow-x-auto">
                <div className="flex space-x-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size="sm"
                      variant={
                        value && value.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className=" bg-[#0D0D0D] hover:bg-[#1F1F1F] m-0 p-2"
                      onClick={() =>
                        handleTimeChange("minute", minute.toString())
                      }
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
              </ScrollArea>

              {/* AM/PM Scroll */}
              <ScrollArea className="w-full overflow-x-auto">
                <div className="flex space-x-2">
                  {["AM", "PM"].map((ampm) => (
                    <Button
                      key={ampm}
                      size="sm"
                      variant={
                        value &&
                        ((ampm === "AM" && value.getHours() < 12) ||
                          (ampm === "PM" && value.getHours() >= 12))
                          ? "default"
                          : "ghost"
                      }
                      className="h-8 w-16 bg-[#0D0D0D] hover:bg-[#1F1F1F]"
                      onClick={() => handleTimeChange("ampm", ampm)}
                    >
                      {ampm}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {touched && error && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
}
