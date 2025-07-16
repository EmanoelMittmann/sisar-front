"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  listAllServices,
  ListServiceResponse,
} from "@/context/controllers/services.controller";
import Link from "next/link";
import { use, useState, useCallback, useEffect } from "react";

export default function AgendamentoPublico({
  params,
}: {
  params: Promise<{ company_id: string }>;
}) {
  const { company_id } = use(params);
  const [services, setServices] = useState<ListServiceResponse[]>([]);

  const queryServiceByCompany = useCallback(async () => {
    if (company_id !== null) {
      const request = await listAllServices(company_id);
      setServices(request);
    }
  }, [company_id]);

  useEffect(() => {
    queryServiceByCompany();
  }, [queryServiceByCompany]);

  // const mapper = {
  //   MONTHLY: "Mensal",
  //   WEEKLY: "Semanal",
  //   YEARLY: "Anual",
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col items-center">
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl flex flex-col items-center">
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
                      <Link href={`${company_id}/agendar/${iterator.id}`}>
                        <Button className="cursor-pointer">Agendar</Button>
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
