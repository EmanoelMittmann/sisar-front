"use client";
import { PopoverMenuProps } from "@/@types/generics/options";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";

export default function PopoverMenu({ options }: PopoverMenuProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bg-white dark:bg-[#111113] shadow w-8 h-8">
          <EllipsisVertical className="text-black dark:text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full flex flex-col gap-2">
        {options.map((item, index) => (
          <div key={index} className="w-full cursor-pointer" onClick={() => item.onClick()}>{item.label}</div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
