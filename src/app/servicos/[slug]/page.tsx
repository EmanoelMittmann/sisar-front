"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  listAllPlans,
  ListPlansResponse,
} from "@/context/controllers/plans.controller";
import { assocPlanToUser } from "@/context/controllers/schedule.controller";
import {
  listAllServices,
  ListServiceResponse,
} from "@/context/controllers/services.controller";
import { useAuthCtx } from "@/context/dal/auth-dal";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";

export default function Agendar(_: { params: Promise<{ slug: string }> }) {
  const { slug } = use(_.params);
  const [services, setServices] = useState<ListServiceResponse[]>([]);
  const [plans, setPlans] = useState<ListPlansResponse[]>([]);
  const navigate = useRouter();

  const queryServiceByCompany = useCallback(async () => {
    if (slug !== null) {
      const request = await listAllServices(slug);
      setServices(request);
    }
  }, [slug]);

  const queryPlansByCompany = useCallback(async () => {
    if (slug !== null) {
      const request = await listAllPlans(slug);
      setPlans(request);
    }
  }, [slug]);

  async function assocPlan(planId: string, userId: string) {
    try {
      await assocPlanToUser(planId, userId);
    } catch (error) {
      console.error(error);
    }
  }

  const { user } = useAuthCtx();

  useEffect(() => {
    queryServiceByCompany();
    queryPlansByCompany();
  }, [queryServiceByCompany, queryPlansByCompany]);

  const mapper = {
    MONTHLY: "Mensal",
    WEEKLY: "Semanal",
    YEARLY: "Anual",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col items-center">
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h3 className="font-bold text-xl p-5">Barbearia Tal | Serviços</h3>
          <div className="w-2xl max-sm:w-sm sm:w-xl md:w-3xl h-auto border border-gray-300 rounded p-4 ">
            <h4 className="font-bold">Populares</h4>
            <Table>
              <TableBody>
                {services.length === 0 && (
                  <TableRow className="flex justify-center items-center">
                    <TableCell colSpan={4} className="text-center">
                      Nenhum serviço encontrado
                    </TableCell>
                  </TableRow>
                )}
                {services.map((iterator) => (
                  <TableRow
                    key={iterator.id}
                    className="flex justify-between items-center"
                  >
                    <TableCell>{iterator.name}</TableCell>
                    <TableCell>{iterator.duration}</TableCell>
                    <TableCell>
                      R$ {(iterator.price / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="cursor-pointer"
                        onClick={() => {
                          document.startViewTransition(() =>
                            navigate.push(
                              `/servicos/${slug}/agendar/${iterator.id}`
                            )
                          );
                        }}
                      >
                        Agendar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h4 className="font-bold mt-4">Planos</h4>
            <Table>
              <TableBody>
                {plans.length === 0 && (
                  <TableRow className="flex justify-center items-center">
                    <TableCell colSpan={4} className="text-center">
                      Nenhum plano encontrado
                    </TableCell>
                  </TableRow>
                )}
                {plans.map((iterator, index) => (
                  <TableRow
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <TableCell>{iterator.name}</TableCell>
                    <TableCell>
                      {mapper[iterator.recurrent as keyof typeof mapper]}
                    </TableCell>
                    <TableCell>
                      R$ {(iterator.price / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="cursor-pointer"
                        onClick={() =>
                          assocPlan(iterator.uuid, user?.sub as string)
                        }
                      >
                        Assinar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
}
