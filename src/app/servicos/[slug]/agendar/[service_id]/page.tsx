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
import { JSX, use, useRef } from "react";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";

const AVAILABLE_INTERVALS: IOptions = [
  {
    label: "08:00-08:30",
    value: `${new Date().setHours(8, 0)}-${new Date().setHours(8, 30)}`,
  },
  {
    label: "08:30-09:00",
    value: `${new Date().setHours(8, 30)}-${new Date().setHours(9, 0)}`,
  },
  {
    label: "09:00-09:30",
    value: `${new Date().setHours(9, 0)}-${new Date().setHours(9, 30)}`,
  },
  {
    label: "09:30-10:00",
    value: `${new Date().setHours(9, 30)}-${new Date().setHours(10, 0)}`,
  },
  {
    label: "10:00-10:30",
    value: `${new Date().setHours(10, 0)}-${new Date().setHours(10, 30)}`,
  },
  {
    label: "10:30-11:00",
    value: `${new Date().setHours(10, 30)}-${new Date().setHours(11, 0)}`,
  },
  {
    label: "11:00-11:30",
    value: `${new Date().setHours(11, 0)}-${new Date().setHours(11, 30)}`,
  },
  {
    label: "13:00-13:30",
    value: `${new Date().setHours(13, 0)}-${new Date().setHours(13, 30)}`,
  },
  {
    label: "13:30-14:00",
    value: `${new Date().setHours(13, 30)}-${new Date().setHours(14, 0)}`,
  },
  {
    label: "14:00-14:30",
    value: `${new Date().setHours(14, 0)}-${new Date().setHours(14, 30)}`,
  },
  {
    label: "14:30-15:00",
    value: `${new Date().setHours(14, 30)}-${new Date().setHours(15, 0)}`,
  },
  {
    label: "15:00-15:30",
    value: `${new Date().setHours(15, 0)}-${new Date().setHours(15, 30)}`,
  },
  {
    label: "15:30-16:00",
    value: `${new Date().setHours(15, 30)}-${new Date().setHours(16, 0)}`,
  },
  {
    label: "16:00-16:30",
    value: `${new Date().setHours(16, 0)}-${new Date().setHours(16, 30)}`,
  },
  {
    label: "16:30-17:00",
    value: `${new Date().setHours(16, 30)}-${new Date().setHours(17, 0)}`,
  },
  {
    label: "17:00-17:30",
    value: `${new Date().setHours(17, 0)}-${new Date().setHours(17, 30)}`,
  },
  {
    label: "17:30-18:00",
    value: `${new Date().setHours(17, 30)}-${new Date().setHours(18, 0)}`,
  },
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
      currentDate: new Date(),
    },
  });

  const handleSubmit = async (data: ISchedulerSchema) => {
    if (data.currentDate === null) {
      toast.error("Por favor, selecione uma data válida.");
      return;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      await createSchedule({
        contract_date: data.currentDate as Date,
        service_id: service_id, // Replace with actual service ID
        remember_user: true,
      });

      modalRef.current?.handleClose();
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
            <Select>
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
