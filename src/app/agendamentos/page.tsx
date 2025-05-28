"use client";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useQuery } from "@/hooks/use-query";
import ClockIcon from "@/theme/icons/clock-icon";
import { useMemo } from "react";

interface Agendamento {
  id: number;
  createdAt: string;
  companyName: string;
  type: string;
  status: "Pendente" | "Finalizado" | "Cancelado";
  service: {
    name: string;
  };
}

export default function Agendamentos() {
  const { data, isLoading } = useQuery("findAllSchedules");

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

  const schedules = useMemo(() => {
    return {
      pending:
        Array.isArray(data) && !isLoading
          ? data.filter((item: Agendamento) => item.status === "Pendente")
          : [],
      finished:
        Array.isArray(data) && !isLoading
          ? data.filter((item: Agendamento) => item.status === "Finalizado")
          : [],
      canceled:
        Array.isArray(data) && !isLoading
          ? data.filter((item: Agendamento) => item.status === "Cancelado")
          : [],
    };
  }, [data, isLoading]);

  const MAPPER_STATUS = {
    Pendente: "secondary",
    Finalizado: "default",
    Cancelado: "destructive",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-12">
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h5 className="text-2xl font-semibold mb-6 text-start">
            Agendamentos Pendentes
          </h5>
          <Table>
            <TableBody>
              {schedules.pending.map((item: Agendamento) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm flex justify-between items-center p-2"
                >
                  <TableCell>
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-black dark:text-white font-bold">
                        {item.companyName}
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
                      {transformDate(item.createdAt)}{" "}
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
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h5 className="text-2xl font-semibold mb-6 text-start">
            Agendamentos Finalizados
          </h5>
          <Table>
            <TableBody>
              {schedules.finished.map((item: Agendamento) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-100 cursor-pointer flex justify-between items-center p-2"
                >
                  <TableCell>
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-black dark:text-white font-bold">
                        {item.companyName}
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
                      {transformDate(item.createdAt)}{" "}
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
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h5 className="text-2xl font-semibold mb-6 text-start">
            Agendamentos Cancelado
          </h5>
          <Table>
            <TableBody>
              {schedules.canceled.map((item: Agendamento) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-100 cursor-pointer flex justify-between items-center p-2"
                >
                  <TableCell>
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-black dark:text-white font-bold">
                        {item.companyName}
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
                      {transformDate(item.createdAt)}{" "}
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
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  );
}
