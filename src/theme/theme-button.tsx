"use client";
import { useTheme } from "next-themes";
import SunIcon from "./icons/sun-icon";
import MoonIcon from "./icons/moon-icon";
import { Button } from "@/components/ui/button";

export const ThemeButton = () => {
  const { setTheme } = useTheme();

  return (
    <div className="w-3xs h-5 flex flex-row justify-center gap-4 items-center bg-none">
      <Button className="dark:bg-black bg-white cursor-pointer" onClick={() => setTheme("dark")}>
        <MoonIcon className="fill-black dark:fill-white" />
      </Button>
      <Button className="dark:bg-black bg-white cursor-pointer" onClick={() => setTheme("light")}>
        <SunIcon className="fill-black dark:fill-white" />
      </Button>
    </div>
  );
};
