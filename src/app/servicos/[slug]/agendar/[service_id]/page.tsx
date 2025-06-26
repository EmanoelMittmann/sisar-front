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
import { createSchedule } from "@/context/controllers/schedule.controller";
import { useGenericModal } from "@/hooks/useGenericModal";
import { Temporal } from "@js-temporal/polyfill";
import { useRouter } from "next/navigation";
import { JSX, use, useRef } from "react";
import { Form, useForm } from "react-hook-form";

const generateInterval = (
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
) => {
  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    startHour - 3,
    startMinute
  );
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    endHour - 3,
    endMinute
  );

  // Format to ISO string and take only the needed part: YYYY-MM-DDTHH:MM:00
  const formatToISO = (date: Date) => {
    return date.toISOString().slice(0, 16) + ":00";
  };

  return {
    label: `${String(startHour).padStart(2, "0")}:${String(
      startMinute
    ).padStart(2, "0")}-${String(endHour).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")}`,
    value: `${formatToISO(start)}*${formatToISO(end)}`,
  };
};

const AVAILABLE_INTERVALS: IOptions = [
  generateInterval(8, 0, 8, 30),
  generateInterval(8, 30, 9, 0),
  generateInterval(9, 0, 9, 30),
  generateInterval(9, 30, 10, 0),
  generateInterval(10, 0, 10, 30),
  generateInterval(10, 30, 11, 0),
  generateInterval(11, 0, 11, 30),
  generateInterval(13, 0, 13, 30),
  generateInterval(13, 30, 14, 0),
  generateInterval(14, 0, 14, 30),
  generateInterval(14, 30, 15, 0),
  generateInterval(15, 0, 15, 30),
  generateInterval(15, 30, 16, 0),
  generateInterval(16, 0, 16, 30),
  generateInterval(16, 30, 17, 0),
  generateInterval(17, 0, 17, 30),
  generateInterval(17, 30, 18, 0),
];

export default function Agendar(_: {
  params: Promise<{ service_id: string }>;
}) {
  const { service_id } = use(_.params);
  const modalRef = useRef<IRefActions>(null);
  const form = useForm<ISchedulerSchema>({
    defaultValues: {
      interval: "",
      description: "",
    },
  });
  const navigate = useRouter();

  const handleSubmit = async (data: ISchedulerSchema) => {
    const date = data.interval.split("*")[0];
    const transformedDate = new Date(date);
    try {
      const { link } = await createSchedule({
        contract_date: transformedDate,
        service_id: service_id,
        remember_user: true,
      });

      modalRef.current?.handleClose();
      window.open(link, "_blank");
      navigate.push("/sucesso-agendamento");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  function DEFAULT_FORM_SCHEDULER(): JSX.Element {
    return (
      <Form control={form.control}>
        <div className="flex flex-col items-start gap-6">
          <div className="w-full h-full border border-gray-600 rounded-md p-2 pl-3 text-sm">
            {form.watch("currentDate")?.toLocaleDateString("pt-BR")}
          </div>
          <div className="w-full h-full">
            <Label className="pl-2">Horários</Label>
            <Select onValueChange={(value) => form.setValue("interval", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem disabled value="__NONE__">
                    Selecione
                  </SelectItem>
                  {AVAILABLE_INTERVALS.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option.value}
                      className="hover:bg-gray-200 cursor-pointer"
                    >
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
      {constructModal(
        modalRef,
        "Agendar horário",
        DEFAULT_FORM_SCHEDULER(),
        () => handleSubmit(form.getValues())
      )}
      <section className="mb-12 flex flex-col items-center w-2xl max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl h-3/5 max-sm:items-start">
        <h3 className="font-bold">Marcar Horário</h3>
      </section>
      <div className="px-24 max-sm:px-0 flex flex-col items-center">
        <section className="w-4xl max-sm:w-[350px] sm:w-xl md:w-3xl lg:w-7xl">
          <Calendar
            onClick={(date: Temporal.PlainDateTime) => {
              form.setValue(
                "currentDate",
                new Date(
                  date.year as number,
                  date.month as number,
                  date.day as number
                )
              );
              modalRef.current?.handleOpen();
            }}
          />
        </section>
      </div>
    </div>
  );
}
