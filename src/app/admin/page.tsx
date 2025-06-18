"use client";
import { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  alterStatus,
  findScheduleByOrganization,
} from "@/context/controllers/schedule.controller";
import { useAuthCtx } from "@/context/dal/auth-dal";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ClockIcon from "@/theme/icons/clock-icon";
import { Badge } from "@/components/ui/badge";
import PopoverMenu from "@/components/custom_components/popover";
import { PopoverMenu as PopoverType } from "@/@types/generics/options";
import { useGenericModal } from "@/hooks/useGenericModal";
import { IRefActions } from "@/@types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { listPublicSchedules } from "@/context/controllers/public-schedule.controller";
import { useRouter } from "next/navigation";

type StatusType = "PENDING" | "FINISH" | "CANCELED" | "NOT_PAY";
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
  status: StatusType;
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

export default function AdminInicio() {
  const [schedules, setSchedules] = useState<Agendamento[]>([]);

  const getScheduleByCompany = useCallback(async () => {
    try {
      const data = await findScheduleByOrganization();
      const publics = await listPublicSchedules();

      setSchedules([data, publics].flat() as Agendamento[]);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  }, []);

  useEffect(() => {
    getScheduleByCompany();
  }, [getScheduleByCompany]);

  const { user } = useAuthCtx();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex flex-row items-center justify-between max-sm:flex-col sm:flex-col md:flex-row lg:flex-row mb-12">
        <h1 className="text-2xl font-bold whitespace-nowrap mb-4">
          Bem-vindo {user?.username}
        </h1>
        {/* <span className="text-lg whitespace-nowrap text-black flex flex-row items-center gap-5">
          <h6 className="dark:text-white text-black">Entradas do Mês:</h6>
          <h6 className="text-green-500">R$ 1000.00</h6>
        </span> */}
      </section>
      <section>
        <h4 className="text-xl font-semibold">Agendamentos Recentes</h4>
        <div className="flex flex-row items-center justify-start py-4 gap-x-4">
          <Input className="w-56" placeholder="Buscar" />
        </div>
        <div className="overflow-y-scroll overflow-x-hidden h-[600px]">
          <ScheduleTable schedules={schedules} refetch={getScheduleByCompany} />
        </div>
      </section>
    </div>
  );
}

export function ScheduleTable({
  schedules,
  refetch,
}: {
  schedules: Agendamento[];
  refetch: () => void;
}): JSX.Element {
  const modalRef = useRef<IRefActions>(null);
  const [status, setStatus] = useState<StatusType>("PENDING");
  const navigate = useRouter();

  function buildPopoverOpts(id: string): PopoverType[] {
    return [
      {
        label: "Detalhes",
        onClick: () => navigate.push(`/agendamentos/${id}`),
      },
      {
        label: "Editar Status",
        onClick: () => modalRef.current?.handleOpen(),
      },
    ];
  }

  async function handleAlterStatus(scheduleId: string, status: StatusType) {
    try {
      await alterStatus(scheduleId, status);
      toast.success("Status alterado com sucesso!");
      modalRef.current?.handleClose();
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  const select_form = (): JSX.Element => {
    return (
      <div className="w-full">
        <Select
          onValueChange={(value) => {
            setStatus(value as StatusType);
          }}
          value={status}
        >
          <SelectTrigger className="w-[343px] max-sm:w-[245px] sm:w-[460px]">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Pendente</SelectItem>
            <SelectItem value="FINISH">Finalizado</SelectItem>
            <SelectItem value="CANCELED">Cancelado</SelectItem>
            <SelectItem value="NOT_PAY">Não Pago</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

  const { constructModal } = useGenericModal();

  console.log(schedules);

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
              {constructModal(
                modalRef,
                "Editar status de agendamento",
                select_form(),
                () => handleAlterStatus(item.uuid, status)
              )}
              <TableCell>
                <div className="flex flex-col justify-start items-start">
                  <span className="text-sm text-black dark:text-white font-bold">
                    {item.organization.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.service.name}
                  </span>
                </div>
              </TableCell>
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
              <TableCell>
                <PopoverMenu options={buildPopoverOpts(item.uuid)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }, [constructModal, schedules]);

  return table;
}
