"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  listAllPlans,
  ListPlansResponse,
} from "@/context/controllers/plans.controller";
import {
  listAllServices,
  ListServiceResponse,
} from "@/context/controllers/services.controller";
import Link from "next/link";
import { use, useState, useCallback, useEffect } from "react";

// const AVAILABLE_INTERVALS: IOptions = [
//   {
//     label: "08:00-08:30",
//     value: `${new Date().setHours(8, 0)}-${new Date().setHours(8, 30)}`,
//   },
//   {
//     label: "08:30-09:00",
//     value: `${new Date().setHours(8, 30)}-${new Date().setHours(9, 0)}`,
//   },
//   {
//     label: "09:00-09:30",
//     value: `${new Date().setHours(9, 0)}-${new Date().setHours(9, 30)}`,
//   },
//   {
//     label: "09:30-10:00",
//     value: `${new Date().setHours(9, 30)}-${new Date().setHours(10, 0)}`,
//   },
//   {
//     label: "10:00-10:30",
//     value: `${new Date().setHours(10, 0)}-${new Date().setHours(10, 30)}`,
//   },
//   {
//     label: "10:30-11:00",
//     value: `${new Date().setHours(10, 30)}-${new Date().setHours(11, 0)}`,
//   },
//   {
//     label: "11:00-11:30",
//     value: `${new Date().setHours(11, 0)}-${new Date().setHours(11, 30)}`,
//   },
//   {
//     label: "13:00-13:30",
//     value: `${new Date().setHours(13, 0)}-${new Date().setHours(13, 30)}`,
//   },
//   {
//     label: "13:30-14:00",
//     value: `${new Date().setHours(13, 30)}-${new Date().setHours(14, 0)}`,
//   },
//   {
//     label: "14:00-14:30",
//     value: `${new Date().setHours(14, 0)}-${new Date().setHours(14, 30)}`,
//   },
//   {
//     label: "14:30-15:00",
//     value: `${new Date().setHours(14, 30)}-${new Date().setHours(15, 0)}`,
//   },
//   {
//     label: "15:00-15:30",
//     value: `${new Date().setHours(15, 0)}-${new Date().setHours(15, 30)}`,
//   },
//   {
//     label: "15:30-16:00",
//     value: `${new Date().setHours(15, 30)}-${new Date().setHours(16, 0)}`,
//   },
//   {
//     label: "16:00-16:30",
//     value: `${new Date().setHours(16, 0)}-${new Date().setHours(16, 30)}`,
//   },
//   {
//     label: "16:30-17:00",
//     value: `${new Date().setHours(16, 30)}-${new Date().setHours(17, 0)}`,
//   },
//   {
//     label: "17:00-17:30",
//     value: `${new Date().setHours(17, 0)}-${new Date().setHours(17, 30)}`,
//   },
//   {
//     label: "17:30-18:00",
//     value: `${new Date().setHours(17, 30)}-${new Date().setHours(18, 0)}`,
//   },
// ];

export default function AgendamentoPublico({
  params,
}: {
  params: Promise<{ company_id: string }>;
}) {
  const { company_id } = use(params);
  const [services, setServices] = useState<ListServiceResponse[]>([]);
  const [plans, setPlans] = useState<ListPlansResponse[]>([]);

  const queryServiceByCompany = useCallback(async () => {
    if (company_id !== null) {
      const request = await listAllServices(company_id);
      setServices(request);
    }
  }, [company_id]);

  const queryPlansByCompany = useCallback(async () => {
    if (company_id !== null) {
      const request = await listAllPlans(company_id);
      setPlans(request);
    }
  }, [company_id]);

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
                    <TableCell>R$ {iterator.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Link
                        href={`${company_id}/agendar/${iterator.id}`}
                      >
                        <Button className="cursor-pointer">Agendar</Button>
                      </Link>
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
                    <TableCell>R$ {iterator.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Link href={""}>
                        <Button className="cursor-pointer">Assinar</Button>
                      </Link>
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
