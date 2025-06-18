"use client";
import { PopoverMenu as PopoverType } from "@/@types/generics/options";
import PopoverMenu from "@/components/custom_components/popover";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { listPlansByUser } from "@/context/controllers/plans.controller";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Assinatura {
  uuid: string;
  name: string;
  price: number;
  status: boolean;
  recurrent: "WEEKLY" | "MONTHLY" | "YEARLY";
  description: string;
  dueDate: Date;
}

export default function Assinaturas() {
  const [plans, setPlans] = useState<Assinatura[]>([]);

  const MAPPER_RECURRENCIA = {
    WEEKLY: "Semanal",
    MONTHLY: "Mensal",
    YEARLY: "Anual",
  };

  const navigate = useRouter();

  const getPlans = useCallback(async () => {
    const data = await listPlansByUser();
    setPlans(data as Assinatura[]);
  }, []);

  function buildPopoverOpts(id: string): PopoverType[] {
    return [
      {
        label: "Cancelar",
        onClick: () => console.log(`Cancelando assinatura ${id}`),
      },
      {
        label: "Detalhes",
        onClick: () => navigate.push(`/assinaturas/${id}`),
      },
    ];
  }

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-12">
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h5 className="text-2xl font-semibold mb-6 text-start">
            Minhas Assinaturas
          </h5>
          <Table>
            <TableBody>
              {plans.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm flex justify-between items-center p-2"
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge variant={item.status ? "default" : "destructive"}>
                      {item.status ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell>{MAPPER_RECURRENCIA[item.recurrent]}</TableCell>
                  <TableCell>
                    {new Date(item.dueDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <PopoverMenu options={buildPopoverOpts(item.uuid)} />
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
