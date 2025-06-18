"use client";
import { IOptions, IRefActions } from "@/@types";
import { ISchedulerSchema } from "@/@types/scheduler";
import { Calendar } from "@/components/custom_components/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createPublicSchedule } from "@/context/controllers/public-schedule.controller";
import { useGenericModal } from "@/hooks/useGenericModal";
import { useRef, use } from "react";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";

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

export default function AgendarPublico({
  params,
}: {
  params: Promise<{ service_id: string; company_id: string }>;
}) {
  const { service_id, company_id } = use(params);
  const { constructModal } = useGenericModal();
  const modalRef = useRef<IRefActions>(null);
  const navigate = useRouter();

  const form = useForm<ISchedulerSchema>({
    defaultValues: {
      interval: "",
      description: "",
    },
  });

  async function onSubmit(data: ISchedulerSchema) {
    const date = data.interval.split("*")[0];
    const transformedDate = new Date(date);
    try {
      await createPublicSchedule(company_id, {
        contract_date: transformedDate,
        service_id: service_id,
        description: data.description,
      });
      modalRef.current?.handleClose();
      toast.success("Horário agendado com sucesso!");
      navigate.push("/sucesso-agendamento");
    } catch (error) {
      console.error(error);
    }
  }

  function DEFAULT_FORM() {
    return (
      <Form control={form.control}>
        <div className="flex flex-col items-center gap-4">
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
                    className="hover:bg-gray-200 cursor-pointer"
                    key={index}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea placeholder="Descreva a observação aqui" />
        </div>
      </Form>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {constructModal(modalRef, "Agendar", DEFAULT_FORM(), () =>
        onSubmit(form.getValues())
      )}
      <section className="mb-12 flex flex-col items-center w-3xl max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl h-auto max-sm:items-center sm:items-center">
        <h3 className="font-bold">Marcar Horário</h3>
      </section>
      <div className="px-24 max-sm:px-0 flex flex-col items-center">
        <section className="w-4xl max-sm:w-[350px] sm:w-xl md:w-3xl lg:w-7xl">
          <Calendar onClick={() => modalRef.current?.handleOpen()} />
        </section>
      </div>
    </div>
  );
}
