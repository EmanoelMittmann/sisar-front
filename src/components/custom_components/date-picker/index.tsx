"use client";
import { IDatePickerProps } from "@/@types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React from "react";

export const DatePicker = ({ date, setDate }: IDatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "col-span-3 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP", { locale: ptBR })
          ) : (
            <span>Selecione a data de vencimento</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={ptBR}
          lang="pt-BR"
          mode="single"
          selected={date}
          onSelect={(e) => setDate(e as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

DatePicker.displayName = "DatePicker";
