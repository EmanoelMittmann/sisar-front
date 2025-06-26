"use client";
import { Badge } from "@/components/ui/badge";
import { detailsSchedule } from "@/context/controllers/schedule.controller";
import { use, useCallback, useEffect, useState } from "react";

interface DetailsScheduleProps {
  uuid: string;
  contract_date: Date;
  status: string;
  service: {
    name: string;
    price: number;
    duration: string;
  };
  user: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  } | null;
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

export default function DetalhesDeAgendamento({
  params,
}: {
  params: Promise<{ schedule_id: string }>;
}) {
  const { schedule_id } = use(params);
  const [schedule, setSchedule] = useState<DetailsScheduleProps | null>(null);

  const fetchScheduleDetails = useCallback(async () => {
    try {
      const data = await detailsSchedule(schedule_id);
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching schedule details:", error);
    }
  }, [schedule_id]);

  useEffect(() => {
    fetchScheduleDetails();
  }, [fetchScheduleDetails]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-12">
        <section className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h5 className="text-2xl font-bold mb-6 text-start">
            Detalhes do Agendamento
          </h5>
          {schedule != null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h6 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Informações do Serviço
                  </h6>
                  <div className="mt-2 space-y-2">
                    <p className="flex justify-between">
                      <span className="font-medium">Serviço:</span>{" "}
                      <span>{schedule.service.name}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Preço:</span>{" "}
                      <span>
                        R$ {Number(schedule.service.price / 100).toFixed(2)}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Duração:</span>{" "}
                      <span>{schedule.service.duration}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h6 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Status do Agendamento
                  </h6>
                  <div className="mt-2">
                    <Badge
                      variant={
                        MAPPER_STATUS[
                          schedule.status as keyof typeof MAPPER_STATUS
                        ] as
                          | "secondary"
                          | "default"
                          | "destructive"
                          | "outline"
                          | null
                          | undefined
                      }
                    >
                      {
                        MAPPER_PRESENTATION[
                          schedule.status as keyof typeof MAPPER_PRESENTATION
                        ]
                      }
                    </Badge>
                  </div>
                </div>

                <div>
                  <h6 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Data e Hora
                  </h6>
                  <p className="mt-2">
                    {new Date(schedule.contract_date).toLocaleDateString(
                      "pt-BR"
                    )}{" "}
                    às{" "}
                    {new Date(schedule.contract_date).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h6 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Informações do Cliente
                  </h6>
                  <div className="mt-2 space-y-2">
                    <p className="flex justify-between">
                      <span className="font-medium">Nome:</span>{" "}
                      <span>{schedule.user?.name || "-"}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Email:</span>{" "}
                      <span>{schedule.user?.email || "-"}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Telefone:</span>{" "}
                      <span>
                        {schedule.user?.phone
                          ? schedule.user.phone.replace(
                              /(\d{2})(\d{5})(\d{4})/,
                              "($1) $2-$3"
                            )
                          : "-"}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">CPF:</span>
                      <span>
                        {schedule.user?.cpf
                          ? schedule.user.cpf.replace(
                              /(\d{3})(\d{3})(\d{3})(\d{2})/,
                              "$1.$2.$3-$4"
                            )
                          : "-"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full text-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando detalhes do plano...</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
