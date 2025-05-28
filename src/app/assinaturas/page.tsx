"use client";
import { PopoverMenu as PopoverType } from "@/@types/generics/options";
import PopoverMenu from "@/components/custom_components/popover";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useQuery } from "@/hooks/use-query";
import { useMemo } from "react";

export default function Assinaturas() {
  // Mock data for recurrent subscriptions
  // const subscriptions: {
  //   id: number;
  //   name: string;
  //   price: string;
  //   renewalDate: string;
  //   status: keyof typeof VARIANT_STATUS;
  // }[] = [
  //   {
  //     id: 1,
  //     name: "Plano Básico",
  //     price: "R$ 29,90",
  //     renewalDate: "2025-05-01",
  //     status: "Ativo",
  //   },
  //   {
  //     id: 2,
  //     name: "Plano Básico",
  //     price: "R$ 29,90",
  //     renewalDate: "2025-05-01",
  //     status: "Ativo",
  //   },
  //   {
  //     id: 3,
  //     name: "Plano Básico",
  //     price: "R$ 29,90",
  //     renewalDate: "2025-05-01",
  //     status: "Inativo",
  //   },
  //   {
  //     id: 4,
  //     name: "Plano Básico",
  //     price: "R$ 29,90",
  //     renewalDate: "2025-05-01",
  //     status: "Ativo",
  //   },
  //   {
  //     id: 5,
  //     name: "Plano Básico",
  //     price: "R$ 29,90",
  //     renewalDate: "2025-05-01",
  //     status: "Ativo",
  //   },
  //   {
  //     id: 6,
  //     name: "Plano Básico",
  //     price: "R$ 29,90",
  //     renewalDate: "2025-05-01",
  //     status: "Inativo",
  //   },
  // ];

  const { data, isLoading } = useQuery("listPlanByUser");

  const subscriptions = useMemo(() => {
    if (Array.isArray(data) && !isLoading) {
      return data.map((item: any) => ({
        id: item.uuid,
        name: item.name,
        price: item.price,
        status: new Date(item.dueDate) < new Date() ? "Inativo" : "Ativo",
      }));
    }
    return [];
  }, [data, isLoading]);

  const VARIANT_STATUS: Record<"Ativo" | "Inativo", "default" | "destructive"> =
    {
      Ativo: "default",
      Inativo: "destructive",
    };

  function buildPopoverOpts(id: string): PopoverType[] {
    return [
      {
        label: "Cancelar",
        onClick: () => console.log(`Cancelando assinatura ${id}`),
      },
      {
        label: "Detalhes",
        onClick: () => console.log(`Exibindo detalhes da assinatura ${id}`),
      },
    ];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-12">
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h5 className="text-2xl font-semibold mb-6 text-start">
            Minhas Assinaturas
          </h5>
          <Table>
            <TableBody>
              {subscriptions.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm flex justify-between items-center p-2"
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        VARIANT_STATUS[
                          item.status as keyof typeof VARIANT_STATUS
                        ]
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
        </section>
      </div>
    </div>
  );
}
