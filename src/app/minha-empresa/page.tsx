"use client";

import { IRefActions } from "@/@types/generics/ref_actions";
import PopoverMenu from "@/components/custom_components/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ClockIcon from "@/theme/icons/clock-icon";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICompanyPlansSchema, ICompanyServiceSchema } from "@/@types";
import { useAlert } from "@/hooks/use-alert";
import { useGenericModal } from "@/hooks/useGenericModal";
import { DEFAULT_PLANS_FORM } from "@/components/forms/plans";
import { DEFAULT_SERVICE_FORM } from "@/components/forms/services";
import { useQuery } from "@/hooks/use-query";
import {
  listPlansByUser,
  ListPlansResponse,
} from "@/context/controllers/plans.controller";
import {
  ListServiceResponse,
  myServicesByUser,
} from "@/context/controllers/services.controller";
import { useMutate } from "@/hooks/use-mutate";

export default function Company() {
  const serviceRef = React.useRef<IRefActions>(null);
  const serviceEditRef = React.useRef<IRefActions>(null);
  const plansRef = React.useRef<IRefActions>(null);
  const plansEditRef = React.useRef<IRefActions>(null);
  const alert1Ref = React.useRef<IRefActions>(null);
  const alert2Ref = React.useRef<IRefActions>(null);

  const { constructAlert } = useAlert();
  const { constructModal } = useGenericModal();

  const [plans, setPlans] = useState<ListPlansResponse[]>([]);
  const [services, setServices] = useState<ListServiceResponse[]>([]);

  const service_form = useForm<ICompanyServiceSchema>({
    defaultValues: {
      name: "",
      price: 0,
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
      recurrent: "",
    },
  });

  const { data: obj } = useQuery("getEstablishmentByUuid");
  const { mutateAsync: createPlan } = useMutate("createPlan");
  const { mutateAsync: createService } = useMutate("createService");
  const { mutateAsync: updatePlan } = useMutate("updatePlan");
  const { mutateAsync: updateService } = useMutate("updateService");

  const getServices = useCallback(async () => {
    const request = await myServicesByUser();
    setServices(request);
  }, []);

  const getPlans = useCallback(async () => {
    const request = await listPlansByUser();
    setPlans(request);
  }, []);

  async function handleCreatePlan(data: ICompanyPlansSchema) {
    try {
      await createPlan(obj.organization_id, data);
      plansRef.current?.handleClose();
    } catch (error) {
      console.error("Error creating plan:", error);
    }
  }

  function formatCNPJ(value: string | undefined): string {
    if (!value) return "";

    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, "");

    // Apply CNPJ mask (xx.xxx.xxx/xxxx-xx)
    return cleanValue
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18); // Ensure it doesn't exceed CNPJ length
  }

  function formatPhoneNumber(phone: string | undefined): string {
    if (!phone) return "";
    const cleanValue = phone.replace(/\D/g, "");
    if (cleanValue.length <= 10) {
      return cleanValue
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return cleanValue
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  }

  useEffect(() => {
    getPlans();
    getServices();
  }, [getPlans, getServices]);

  return (
    <div className="container mx-auto px-4 py-8">
      {constructModal(
        serviceRef,
        "Adicionar Serviço",
        DEFAULT_SERVICE_FORM(service_form),
        () => {
          createService({
            ...service_form.getValues(),
            duration: service_form.getValues().estimate,
          });
        }
      )}
      {constructModal(
        plansRef,
        "Adicionar Plano",
        DEFAULT_PLANS_FORM(plans_form),
        () => handleCreatePlan(plans_form.getValues())
      )}
      {constructModal(
        serviceEditRef,
        "Editar Serviço",
        DEFAULT_SERVICE_FORM(service_form),
        () =>
          updateService({
            ...service_form.getValues(),
            duration: service_form.getValues().estimate,
          })
      )}
      {constructModal(
        plansEditRef,
        "Editar Plano",
        DEFAULT_PLANS_FORM(plans_form),
        () => updatePlan(plans_form.getValues())
      )}
      <section className="w-7xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-7xl">
        <h3 className="font-bold text-xl p-5">Minha Empresa</h3>
        <div className="mb-12 pl-4 flex flex-row max-sm:flex-col sm:flex-col md:flex-col lg:flex-row gap-4 w-full">
          <div className="w-7xl max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-md 2xl:w-xl border border-gray-400 rounded p-4">
            <Avatar className="w-24 h-24 rounded cursor-pointer">
              <AvatarImage
                src={obj?.image_path || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-start gap-5 mt-4">
              <Input value={obj?.social_name || ""} disabled />
              <Input value={formatCNPJ(obj?.cnpj) || ""} disabled />
              <Input value={obj?.office || ""} disabled />
              <Input value={formatPhoneNumber(obj?.phone) || ""} disabled />
              <Input value={obj?.email || ""} disabled />
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
                      document.startViewTransition(() => {
                        service_form.resetField("name", { defaultValue: "" });
                        service_form.resetField("estimate", {
                          defaultValue: "",
                        });
                        service_form.resetField("is_quantitative", {
                          defaultValue: false,
                        });
                        service_form.resetField("price", { defaultValue: 0 });
                        serviceRef.current?.handleOpen();
                      })
                    }
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="h-48 w-full overflow-y-scroll">
                  <Table>
                    <TableBody>
                      {Array.isArray(services) && services.length > 0 ? (
                        services.map(
                          (item: ListServiceResponse, index: number) => (
                            <TableRow
                              key={index}
                              className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm flex justify-between items-center p-2"
                            >
                              {constructAlert(
                                alert1Ref,
                                "Excluir Serviço",
                                item.id,
                                "Deseja realmente excluir esse serviço? essa ação não pode ser revertida",
                                () => alert(`Excluido ${item.id}`)
                              )}
                              <TableCell>
                                <div className="flex flex-col items-start">
                                  <span className="text-sm text-black dark:text-white font-bold">
                                    {item.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    R$ {item.price.toFixed(2)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-x-2">
                                  {new Date(item.created_at).toLocaleDateString(
                                    "pt-BR"
                                  )}
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
                                          estimate: item.duration.toString(),
                                        });
                                        document.startViewTransition(() =>
                                          serviceEditRef.current?.handleOpen()
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
                          )
                        )
                      ) : (
                        <>Nada Encontrado</>
                      )}
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
                      document.startViewTransition(() => {
                        plans_form.resetField("name", { defaultValue: "" });
                        plans_form.resetField("price", { defaultValue: "" });
                        plans_form.resetField("dueDate", {
                          defaultValue: undefined,
                        });
                        plans_form.resetField("description", {
                          defaultValue: "",
                        });
                        plansRef.current?.handleOpen();
                      })
                    }
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="h-48 w-full overflow-y-scroll">
                  <Table>
                    <TableBody>
                      {Array.isArray(services) && services.length > 0 ? (
                        plans.map((item: ListPlansResponse, index: number) => (
                          <TableRow
                            key={index}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm flex justify-between items-center p-2"
                          >
                            {constructAlert(
                              alert2Ref,
                              "Excluir Plano",
                              item.uuid,
                              "Deseja realmente excluir esse plano? essa ação não pode ser revertida",
                              () => alert(`Excluido ${item.uuid}`)
                            )}
                            <TableCell>
                              <div className="flex flex-col items-start">
                                <span className="text-sm text-black dark:text-white font-bold">
                                  {item.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  R$ {item.price.toFixed(2)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-x-2">
                                {new Date(item.dueDate).toLocaleDateString(
                                  "pt-BR"
                                )}
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
                                        price: item.price.toString(),
                                        name: item.name,
                                        dueDate: new Date(),
                                        description: "Plano de alguma coisa",
                                      });
                                      document.startViewTransition(() => {
                                        plansEditRef.current?.handleOpen();
                                      });
                                    },
                                  },
                                  {
                                    label: "Excluir",
                                    onClick: () =>
                                      document.startViewTransition(() =>
                                        alert2Ref.current?.handleOpen()
                                      ),
                                  },
                                ]}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <>Nada Encontrado</>
                      )}
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
