"use client";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useQuery } from "@/hooks/use-query";
import ClockIcon from "@/theme/icons/clock-icon";
import { JSX, useMemo } from "react";

interface Agendamento {
  uuid: string;
  organization: {
    uuid: string;
    name: string;
  };
  service: {
    uuid: string;
    name: string;
  };
  contractAt: Date;
  status: "PENDING" | "FINISH" | "CANCELED" | "NOT_PAY";
}

const MAPPER_STATUS = {
  PENDING: "secondary",
  FINISH: "default",
  CANCELED: "destructive",
  NOT_PAY: "outline",
};
const MAPPER_PRESENTATION = {
  PENDING: "Pendente",
  FINISH: "Finalizado",
  CANCELED: "Cancelado",
  NOT_PAY: "Não Pago",
};

function transformDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const oneDigit = (date: number) =>
    date.toString().length === 1 ? `0${date}` : date.toString();

  return `${date.toLocaleDateString("pt-BR", options)} - ${oneDigit(
    date.getHours()
  )}:${oneDigit(date.getMinutes())}`;
}

export default function Agendamentos() {
  const { data, isLoading } = useQuery("findAllSchedules");

  const schedules = useMemo(() => {
    return {
      pending:
        Array.isArray(data) && !isLoading
          ? data.filter((item: Agendamento) => item.status === "PENDING")
          : [],
      finished:
        Array.isArray(data) && !isLoading
          ? data.filter((item: Agendamento) => item.status === "FINISH")
          : [],
      canceled:
        Array.isArray(data) && !isLoading
          ? data.filter((item: Agendamento) => item.status === "CANCELED")
          : [],
    };
  }, [data, isLoading]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-12">
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h5 className="text-2xl font-semibold mb-6 text-start">
            Agendamentos Pendentes
          </h5>
          <ScrollContent>
            <ScheduleTable schedules={schedules.pending} />
          </ScrollContent>
        </section>
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h5 className="text-2xl font-semibold mb-6 text-start">
            Agendamentos Finalizados
          </h5>
          <ScrollContent>
            <ScheduleTable schedules={schedules.finished} />
          </ScrollContent>
        </section>
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h5 className="text-2xl font-semibold mb-6 text-start">
            Agendamentos Cancelado
          </h5>
          <ScrollContent>
            <ScheduleTable schedules={schedules.canceled} />
          </ScrollContent>
        </section>
      </div>
    </div>
  );
}

function ScrollContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[200px] overflow-y-auto border rounded-md">
      {children}
    </div>
  );
}

function ScheduleTable({
  schedules,
}: {
  schedules: Agendamento[];
}): JSX.Element {
  const table = useMemo(() => {
    if (schedules.length === 0) {
      return (
        <div className="flex justify-center items-center h-32">
          <span className="text-gray-500">Nenhum agendamento encontrado</span>
        </div>
      );
    }

    return (
      <Table>
        <TableBody>
          {schedules.map((item: Agendamento, index: number) => (
            <TableRow
              key={index}
              className="hover:bg-gray-300 cursor-pointer flex justify-between items-center p-2"
            >
              <TableCell>
                <div className="flex flex-col items-start">
                  <span className="text-sm text-black dark:text-white font-bold">
                    {item.organization.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.service.name}
                  </span>
                </div>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-x-2">
                  {transformDate(item.contractAt.toString())}{" "}
                  <ClockIcon className="dark:fill-white" />
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    MAPPER_STATUS[item.status] as
                      | "secondary"
                      | "default"
                      | "destructive"
                      | "outline"
                      | null
                      | undefined
                  }
                >
                  {MAPPER_PRESENTATION[item.status]}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }, [schedules]);

  return table;
}
