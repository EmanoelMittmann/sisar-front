"use client";

import {
  getPlanById,
  ListPlansResponse,
} from "@/context/controllers/plans.controller";
import { use, useCallback, useEffect, useState } from "react";

export default function DetalhesDaAssinatura({
  params,
}: {
  params: Promise<{ plan_id: string }>;
}) {
  const { plan_id } = use(params);
  const [plan, setPlan] = useState<ListPlansResponse>();

  const getPlan = useCallback(async () => {
    const data = await getPlanById(plan_id);
    setPlan(data);
  }, [plan_id]);

  useEffect(() => {
    getPlan();
  }, [getPlan]);

  const MAPPER_RECURRENCIA = {
    WEEKLY: "Semanal",
    MONTHLY: "Mensal",
    YEARLY: "Anual",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        <section className="w-full max-w-4xl flex gap-14 flex-col">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Detalhes da Assinatura
          </h2>
          {plan ? (
            <div className="bg-white shadow-xl rounded-lg p-6 w-full">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <span className="block text-sm font-medium text-gray-500">
                      Preço
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(plan.price)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="block text-sm font-medium text-gray-500">
                      Recorrência
                    </span>
                    <span className="text-xl font-medium">
                      {
                        MAPPER_RECURRENCIA[
                          plan.recurrent as keyof typeof MAPPER_RECURRENCIA
                        ]
                      }
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <span className="block text-sm font-medium text-gray-500">
                      ID do Plano
                    </span>
                    <span className="text-gray-800 text-sm font-mono">
                      {plan.uuid}
                    </span>
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-gray-500">
                      Data de Vencimento
                    </span>
                    <span className="text-gray-800">
                      {new Date(plan.dueDate).toLocaleDateString("pt-BR")}
                    </span>
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
