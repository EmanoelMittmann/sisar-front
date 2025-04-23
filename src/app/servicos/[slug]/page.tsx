"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { use } from "react";
const company_services = [
  {
    id: 1,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 2,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 3,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 4,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 5,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 6,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 7,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 8,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 9,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 10,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
  {
    id: 11,
    name: "Corte de cabelo",
    price: "R$ 29,90",
    duration: "30 min",
  },
];

export default function Agendar(_: { params: Promise<{ slug: string }> }) {
  const { slug } = use(_.params);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col items-center">
        <section className="w-4xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-4xl">
          <h3 className="font-bold text-xl p-5">Barbearia Tal | Serviços</h3>
          <div className="w-2xl max-sm:w-sm sm:w-xl md:w-3xl h-auto border border-gray-300 rounded p-4 ">
            <h4 className="font-bold">Populares</h4>
            <Table>
              <TableBody> 
                {company_services.map((iterator) => (
                  <TableRow
                    key={iterator.id}
                    className="flex justify-between items-center"
                  >
                    <TableCell>{iterator.name}</TableCell>
                    <TableCell>{iterator.duration}</TableCell>
                    <TableCell>{iterator.price}</TableCell>
                    <TableCell>
                      <Link href={`${slug}/agendar`}>
                        <Button className="cursor-pointer">agendar</Button>
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
