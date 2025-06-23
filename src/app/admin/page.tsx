"use client";
import {
  Dispatch,
  JSX,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<StatusType>("PENDING");
  const [currentScheduleId, setCurrentScheduleId] = useState<string | null>(
    null
  );

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

  const filteredSchedules = useMemo(() => {
    if (!search) return schedules;

    return schedules.filter((item) =>
      item.service.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [schedules, search]);

  async function handleAlterStatus(scheduleId: string, status: StatusType) {
    try {
      await alterStatus(scheduleId, status);
      toast.success("Status alterado com sucesso!");
      setCurrentScheduleId(null);
      getScheduleByCompany();
    } catch (error) {
      console.error(error);
    }
  }

  const { user } = useAuthCtx();

  useEffect(() => {
    setStatus(
      schedules.find((s) => s.uuid === currentScheduleId)?.status || "PENDING"
    );
  }, [currentScheduleId, schedules]);

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
          <Input
            className="w-56"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-y-scroll overflow-x-hidden h-[600px]">
          <Dialog
            open={!!currentScheduleId}
            onOpenChange={() => setCurrentScheduleId(null)}
          >
            <DialogTitle></DialogTitle>
            <DialogContent>
              <DialogHeader>Editar Status</DialogHeader>
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
              <DialogFooter>
                <Button
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={() => setCurrentScheduleId(null)}
                >
                  Cancelar
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={async () => {
                    if (!currentScheduleId) {
                      toast.error(
                        "Selecione um agendamento para alterar o status."
                      );
                      return;
                    }
                    await handleAlterStatus(currentScheduleId, status);
                  }}
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <ScheduleTable
            schedules={filteredSchedules}
            setCurrentScheduleId={setCurrentScheduleId}
          />
        </div>
      </section>
    </div>
  );
}

function ScheduleTable({
  schedules,
  setCurrentScheduleId,
}: {
  schedules: Agendamento[];
  setCurrentScheduleId: Dispatch<SetStateAction<string | null>>;
}): JSX.Element {
  const navigate = useRouter();

  function buildPopoverOpts(id: string): PopoverType[] {
    return [
      {
        label: "Detalhes",
        onClick: () => navigate.push(`/agendamentos/${id}`),
      },
      {
        label: "Editar Status",
        onClick: () => setCurrentScheduleId(id),
      },
    ];
  }

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
              className="hover:bg-gray-300 dark:hover:bg-gray-900 cursor-pointer flex justify-between items-center p-2"
            >
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
  }, [schedules]);

  return table;
}
