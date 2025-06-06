"use client";

import { IOptions, IRefActions } from "@/@types";
import { ISchedulerSchema } from "@/@types/scheduler";
import { Calendar } from "@/components/custom_components/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGenericModal } from "@/hooks/useGenericModal";
import { JSX, useRef } from "react";
import { Form, useForm } from "react-hook-form";

const DEFAULT_RANGE_INTERVALS: IOptions = [
  {
    label: "08:00-08:30",
    value: `${new Date().setHours(8, 0)}-${new Date(8, 30)}`,
  },
  {
    label: "14:00-14:30",
    value: `${new Date().setHours(14, 0)}-${new Date(14, 30)}`,
  },
  {
    label: "15:30-16:00",
    value: `${new Date().setHours(15, 30)}-${new Date(16, 0)}`,
  },
];

export default function Agendar() {
  const modalRef = useRef<IRefActions>(null);
  const form = useForm<ISchedulerSchema>({
    defaultValues: {
      interval: "",
      description: "",
    },
  });

  function DEFAULT_FORM_SCHEDULER(): JSX.Element {
    return (
      <Form {...form}>
        <div className="flex flex-col items-start gap-4">
          <div className="w-full h-full">
            <Label className="pl-2">Horários</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem disabled value="__NONE__">
                    Selecione
                  </SelectItem>
                  {DEFAULT_RANGE_INTERVALS.map((option, index) => (
                    <SelectItem key={index} value={option.value} className="hover:bg-gray-200 cursor-pointer">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Textarea placeholder="Descreva a observação aqui" />
        </div>
      </Form>
    );
  }

  const { constructModal } = useGenericModal();

  return (
    <div className="container mx-auto px-4 py-8">
      {constructModal(modalRef, "Agendar horário", DEFAULT_FORM_SCHEDULER())}
      <section className="mb-12 flex flex-col items-center w-3xl max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl h-auto max-sm:items-start">
        <h3 className="font-bold">Marcar Horário</h3>
      </section>
      <div className="px-24 max-sm:px-0 flex flex-col items-center">
        <section className="w-4xl max-sm:w-[350px] sm:w-xl md:w-3xl lg:w-7xl">
          <Calendar
            onClick={() => modalRef.current?.handleOpen()}
            onEventClick={(e) => console.log(e)}
          />
        </section>
      </div>
    </div>
  );
}
