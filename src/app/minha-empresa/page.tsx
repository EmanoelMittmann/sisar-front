"use client";

import { IRefActions } from "@/@types/generics/ref_actions";
import PopoverMenu from "@/components/custom_components/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ClockIcon from "@/theme/icons/clock-icon";
import React, { JSX } from "react";
import { Form, useForm } from "react-hook-form";
import { ICompanyPlansSchema, ICompanyServiceSchema } from "@/@types";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/custom_components/date-picker";
import { useAlert } from "@/hooks/use-alert";
import { useGenericModal } from "@/hooks/useGenericModal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT_SERVICES = [
  {
    id: "1",
    name: "Lavagem Simples",
    price: "R$ 29,90",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Lavagem Premium",
    price: "R$ 29,90",
    createdAt: new Date(),
  },
  { id: "3", name: "Aspiragem", price: "R$ 29,90", createdAt: new Date() },
  {
    id: "4",
    name: "Polimento de farois",
    price: "R$ 29,90",
    createdAt: new Date(),
  },
];

export default function Company() {
  const serviceRef = React.useRef<IRefActions>(null);
  const plansRef = React.useRef<IRefActions>(null);
  const alert1Ref = React.useRef<IRefActions>(null);
  const alert2Ref = React.useRef<IRefActions>(null);

  const { constructAlert } = useAlert();
  const { constructModal } = useGenericModal();

  const service_form = useForm<ICompanyServiceSchema>({
    defaultValues: {
      name: "",
      price: "",
      estimate: "",
      is_quantitative: false,
    },
  });

  const plans_form = useForm<ICompanyPlansSchema>({
    defaultValues: {
      name: "",
      price: "",
      dueDate: undefined,
      description: "",
    },
  });

  function DEFAULT_SERVICE_FORM(): JSX.Element {
    return (
      <Form {...service_form} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label>Nome</Label>
          <Input
            placeholder="Nome do serviço"
            className="col-span-3"
            {...service_form.register("name")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label>Preço</Label>
          <Input
            placeholder="Preço do serviço"
            className="col-span-3"
            {...service_form.register("price")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label>Estimativa</Label>
          <Input
            placeholder="30min - 45min"
            className="col-span-3"
            {...service_form.register("estimate")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="flex flex-row gap-2 items-center">
            <Checkbox
              checked={service_form.watch("is_quantitative")}
              onCheckedChange={(e) =>
                service_form.setValue("is_quantitative", e as boolean)
              }
            />
            <div className="grid leading-none">
              <label htmlFor="terms1" className="whitespace-nowrap ">
                Serviço Quantitativo
              </label>
            </div>
          </div>
        </div>
      </Form>
    );
  }
  function DEFAULT_PLANS_FORM(): JSX.Element {
    return (
      <Form control={service_form.control} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label>Nome</Label>
          <Input
            placeholder="Nome do plano"
            className="col-span-3"
            {...plans_form.register("name")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label>Preço</Label>
          <Input
            placeholder="Preço do plano"
            className=" col-span-3"
            {...plans_form.register("price")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label>Recorrência</Label>
          <Select>
            <SelectTrigger className="w-[343px] max-sm:w-[245px] sm:w-[343px]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label>Vencimento</Label>
          <DatePicker
            date={plans_form.watch("dueDate") ?? undefined}
            setDate={(e) => plans_form.setValue("dueDate", e)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Textarea
            placeholder="Escreva sua descriçao aqui"
            className="col-span-4"
            {...plans_form.register("description")}
          />
        </div>
      </Form>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {constructModal(serviceRef, "Adicionar Serviço", DEFAULT_SERVICE_FORM())}
      {constructModal(plansRef, "Adicionar Plano", DEFAULT_PLANS_FORM())}
      <section className="w-7xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-7xl">
        <h3 className="font-bold text-xl p-5">Minha Empresa</h3>
        <div className="mb-12 pl-4 flex flex-row max-sm:flex-col sm:flex-col md:flex-col lg:flex-row gap-4 w-full">
          <div className="w-7xl max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-md 2xl:w-xl border border-gray-400 rounded p-4">
            <Avatar className="w-24 h-24 rounded cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-start gap-5 mt-4">
              <Input value="Emanoel Leffa Ltda." disabled />
              <Input value="000.000.000/0000-01" disabled />
              <Input
                value="Lavagem e higienização de veiculos automotores"
                disabled
              />
              <Input value="(51) 99723-5418" disabled />
              <Input value="sisar@administrator.com" disabled />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-5 w-1/2">
            <div className="max-sm:row-span-3 border border-gray-400 rounded w-3xl max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl h-auto">
              <section className="w-3xl p-6 max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl">
                <div className="flex items-center justify-between">
                  <h5 className="text-2xl font-semibold mb-6 text-center">
                    Serviços
                  </h5>
                  <Button
                    className="cursor-pointer"
                    onClick={() =>
                      document.startViewTransition(() =>
                        serviceRef.current?.handleOpen()
                      )
                    }
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="h-48 w-full overflow-y-scroll">
                  <Table>
                    <TableBody>
                      {DEFAULT_SERVICES.map((item) => (
                        <TableRow
                          key={item.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm flex justify-between items-center p-2"
                        >
                          {constructAlert(
                            alert1Ref,
                            "Excluir Serviço",
                            item.id,
                            "Deseja realmente excluir esse serviço? essa ação não pode ser revertida",
                            (id) => alert(`Excluido ${id}`)
                          )}
                          <TableCell>
                            <div className="flex flex-col items-start">
                              <span className="text-sm text-black dark:text-white font-bold">
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {item.price}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-x-2">
                              {item.createdAt.toLocaleDateString("pt-BR")}
                              <ClockIcon className="dark:fill-white" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <PopoverMenu
                              options={[
                                {
                                  label: "Editar",
                                  onClick: () => {
                                    service_form.reset({
                                      price: item.price,
                                      name: item.name,
                                      estimate: item.createdAt
                                        .getHours()
                                        .toString(),
                                    });
                                    document.startViewTransition(() =>
                                      serviceRef.current?.handleOpen()
                                    );
                                  },
                                },
                                {
                                  label: "Excluir",
                                  onClick: () =>
                                    document.startViewTransition(() =>
                                      alert1Ref.current?.handleOpen()
                                    ),
                                },
                              ]}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </section>
            </div>
            <div className="max-sm:row-span-3 border border-gray-400 rounded w-3xl max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl h-auto">
              <section className="w-3xl max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl p-6">
                <div className="flex items-center justify-between">
                  <h5 className="text-2xl font-semibold mb-6 text-start">
                    Planos
                  </h5>
                  <Button
                    className="cursor-pointer"
                    onClick={() =>
                      document.startViewTransition(() =>
                        plansRef.current?.handleOpen()
                      )
                    }
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="h-48 w-full overflow-y-scroll">
                  <Table>
                    <TableBody>
                      {DEFAULT_SERVICES.map((item) => (
                        <TableRow
                          key={item.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm flex justify-between items-center p-2"
                        >
                          {constructAlert(
                            alert2Ref,
                            "Excluir Plano",
                            item.id,
                            "Deseja realmente excluir esse plano? essa ação não pode ser revertida",
                            (id) => alert(`Excluido ${id}`)
                          )}
                          <TableCell>
                            <div className="flex flex-col items-start">
                              <span className="text-sm text-black dark:text-white font-bold">
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {item.price}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-x-2">
                              {item.createdAt.toLocaleDateString("pt-BR")}
                              <ClockIcon className="dark:fill-white" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <PopoverMenu
                              options={[
                                {
                                  label: "Editar",
                                  onClick: () => {
                                    plans_form.reset({
                                      price: item.price,
                                      name: item.name,
                                      dueDate: new Date(),
                                      description: "Plano de alguma coisa",
                                    });
                                    document.startViewTransition(() => {
                                      plansRef.current?.handleOpen();
                                    });
                                  },
                                },
                                {
                                  label: "Excluir",
                                  onClick: () =>
                                    document.startViewTransition({
                                      update: () => alert2Ref.current?.handleOpen(),
                                      types: ['slide', 'right']
                                    }),
                                },
                              ]}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
