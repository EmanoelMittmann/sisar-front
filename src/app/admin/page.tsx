"use client";
import { useState } from "react";
import { PopoverMenu as PopoverType } from "@/@types/generics/options";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ClockIcon from "@/theme/icons/clock-icon";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import PopoverMenu from "@/components/custom_components/popover";

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

export default function AdminInicio() {
  const [agendamentos] = useState<Agendamento[]>([
    {
      id: 1,
      createdAt: new Date().toISOString(),
      companyName: "Empresa A",
      type: "Consulta",
      status: "Finalizado",
      service: {
        name: "Serviço A",
      },
    },
    {
      id: 2,
      createdAt: new Date().toISOString(),
      companyName: "Empresa B",
      type: "Reunião",
      status: "Pendente",
      service: {
        name: "Serviço A",
      },
    },
    {
      id: 3,
      createdAt: new Date().toISOString(),
      companyName: "Empresa B",
      type: "Reunião",
      status: "Pendente",
      service: {
        name: "Serviço A",
      },
    },
    {
      id: 4,
      createdAt: new Date().toISOString(),
      companyName: "Empresa B",
      type: "Reunião",
      status: "Cancelado",
      service: {
        name: "Serviço A",
      },
    },
    {
      id: 5,
      createdAt: new Date().toISOString(),
      companyName: "Empresa B",
      type: "Reunião",
      status: "Cancelado",
      service: {
        name: "Serviço A",
      },
    },
    {
      id: 6,
      createdAt: new Date().toISOString(),
      companyName: "Empresa B",
      type: "Reunião",
      status: "Pendente",
      service: {
        name: "Serviço A",
      },
    },
    {
      id: 7,
      createdAt: new Date().toISOString(),
      companyName: "Empresa B",
      type: "Reunião",
      status: "Pendente",
      service: {
        name: "Serviço A",
      },
    },
    {
      id: 8,
      createdAt: new Date().toISOString(),
      companyName: "Empresa B",
      type: "Reunião",
      status: "Pendente",
      service: {
        name: "Serviço A",
      },
    },
  ]);

  function buildPopoverOpts(id: string): PopoverType[] {
    return [
      {
        label: "Detalhes",
        onClick: () => console.log(`Exibindo detalhes da assinatura ${id}`),
      },
    ];
  }

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

  const MAPPER_STATUS = {
    Pendente: "secondary",
    Finalizado: "default",
    Cancelado: "destructive",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex flex-row items-center justify-between max-sm:flex-col sm:flex-col md:flex-row lg:flex-row mb-12">
        <h1 className="text-2xl font-bold whitespace-nowrap mb-4">
          Bem-vindo ao Joel
        </h1>
        <span className="text-lg whitespace-nowrap text-black flex flex-row items-center gap-5">
          Entradas do Mês: <h6 className="text-green-500">R$ 1000.00</h6>
        </span>
      </section>
      <section>
        <h4 className="text-xl font-semibold">Agendamentos Recentes</h4>
        <div className="flex flex-row items-center justify-start py-4 gap-x-4">
          <Input className="w-56" placeholder="Buscar" />
        </div>
        <div className="overflow-y-scroll overflow-x-hidden h-102">
          <Table>
            <TableBody>
              {agendamentos.map((item) => (
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
                  <TableCell>
                    <PopoverMenu options={buildPopoverOpts("123")} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
