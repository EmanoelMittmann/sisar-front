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
import {
  deletePlan,
  ICreatePlanInput,
  listPlansByUser,
  ListPlansResponse,
  updatePlan,
} from "@/context/controllers/plans.controller";
import {
  createService,
  deleteService,
  ListServiceResponse,
  myServicesByUser,
  updateService,
  UpdateServiceInput,
} from "@/context/controllers/services.controller";
import { useMutate } from "@/hooks/use-mutate";
import {
  getEstablishmentByUuid,
  IFindUser,
} from "@/context/controllers/organization.controller";
import { toast } from "sonner";

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
  const [organization, setOrganization] = useState<IFindUser | null>(null);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);

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
      price: 0,
      dueDate: undefined,
      description: "",
      quantityInstallments: 0,
    },
  });

  const { mutateAsync: createPlan } = useMutate("createPlan");

  async function mutateCreateService(data: ICompanyServiceSchema) {
    try {
      await createService({
        duration: data.estimate,
        is_quantitative: data.is_quantitative,
        name: data.name,
        price: data.price,
        limit_for_day: 0,
      });
      await getServices();
      serviceRef.current?.handleClose();
      toast.success("Serviço criado com sucesso!");
    } catch (error) {
      console.error("Error creating service:", error);
    }
  }

  async function mutateUpdatePlan(id: string, input: ICreatePlanInput) {
    if (!id) {
      toast.warning("ID do plano não fornecido.");
      return;
    }
    try {
      await updatePlan(id, input);
      plansEditRef.current?.handleClose();
      toast.success("Plano atualizado com sucesso!");
      getPlans();
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  }

  async function mutateUpdateService(id: string, data: UpdateServiceInput) {
    if (!id) {
      toast.warning("ID do serviço não fornecido.");
      return;
    }
    try {
      await updateService(id, data);
      serviceEditRef.current?.handleClose();
      toast.success("Serviço atualizado com sucesso!");
      getServices();
    } catch (error) {
      console.error("Error updating service: ", error);
    }
  }

  const findEstablishmentByUuid = useCallback(async () => {
    const response = await getEstablishmentByUuid();
    setOrganization(response);
  }, []);

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
      await createPlan(organization?.uuid as string, data);
      await getPlans();
      plansRef.current?.handleClose();
    } catch (error) {
      console.error("Error creating plan:", error);
    }
  }

  async function handleDeleteService(id: string) {
    try {
      await deleteService(id);
      await getServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  }

  async function handleDeletePlan(id: string) {
    try {
      await deletePlan(id);
      await getPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
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
    findEstablishmentByUuid();
  }, [getPlans, getServices, findEstablishmentByUuid]);

  return (
    <div className="container mx-auto px-4 py-8">
      {constructModal(
        serviceRef,
        "Adicionar Serviço",
        DEFAULT_SERVICE_FORM(service_form),
        () => {
          mutateCreateService(service_form.getValues());
          serviceRef.current?.handleClose();
          getServices();
        }
      )}
      {constructModal(
        plansRef,
        "Adicionar Plano",
        DEFAULT_PLANS_FORM(plans_form),
        () => {
          handleCreatePlan({
            description: plans_form.getValues().description,
            dueDate: plans_form.getValues().dueDate as Date,
            name: plans_form.getValues().name,
            price: Number(plans_form.getValues().price),
            quantityInstallments: Number(
              plans_form.getValues().quantityInstallments
            ),
          });
          plansRef.current?.handleClose();
          getPlans();
        }
      )}
      {constructModal(
        serviceEditRef,
        "Editar Serviço",
        DEFAULT_SERVICE_FORM(service_form),
        () =>
          mutateUpdateService(currentServiceId as string, {
            duration: service_form.getValues().estimate,
            is_quantitative: service_form.getValues().is_quantitative,
            name: service_form.getValues().name,
            price: Number(service_form.getValues().price),
            limit_for_day: 0,
          })
      )}
      {constructModal(
        plansEditRef,
        "Editar Plano",
        DEFAULT_PLANS_FORM(plans_form),
        () =>
          mutateUpdatePlan(currentPlanId as string, {
            description: plans_form.getValues().description,
            dueDate: plans_form.getValues().dueDate as Date,
            name: plans_form.getValues().name,
            price: Number(plans_form.getValues().price),
            quantityInstallments: Number(
              plans_form.getValues().quantityInstallments
            ),
          })
      )}
      {constructAlert(
        alert1Ref,
        "Excluir Serviço",
        currentServiceId || "",
        "Deseja realmente excluir esse serviço? essa ação não pode ser revertida",
        () => handleDeleteService(currentServiceId as string)
      )}
      {constructAlert(
        alert2Ref,
        "Excluir Plano",
        currentPlanId || "",
        "Deseja realmente excluir esse plano? essa ação não pode ser revertida",
        () => handleDeletePlan(currentPlanId as string)
      )}
      <section className="w-7xl max-sm:w-sm sm:w-xl md:w-3xl lg:w-7xl">
        <h3 className="font-bold text-xl p-5">Minha Empresa</h3>
        <div className="mb-12 pl-4 flex flex-row max-sm:flex-col sm:flex-col md:flex-col lg:flex-row gap-4 w-full">
          {organization ? (
            <div className="w-7xl max-sm:w-xs sm:w-xl md:w-xl lg:w-md xl:w-md 2xl:w-xl border border-gray-400 rounded p-4">
              <Avatar className="w-24 h-24 rounded cursor-pointer">
                <AvatarImage
                  src={
                    organization?.image_path || "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-start gap-5 mt-4">
                <Input value={organization?.social_name || ""} disabled />
                <Input value={formatCNPJ(organization.cnpj) || ""} disabled />
                <Input
                  value={
                    organization?.office == "beauty"
                      ? "Beleza e bem-estar"
                      : organization.office == "cleaning"
                      ? "Limpeza"
                      : organization.office == "domestic"
                      ? "Domésticos"
                      : "Outros"
                  }
                  disabled
                />
                <Input
                  value={formatPhoneNumber(organization?.phone) || ""}
                  disabled
                />
                <Input value={organization?.email || ""} disabled />
              </div>
            </div>
          ) : (
            <div className="w-7xl max-sm:w-sm sm:w-xl md:w-xl lg:w-md xl:w-md 2xl:w-xl border border-gray-400 rounded p-4">
              <p className="text-gray-500">
                Carregando informações da empresa...
              </p>
            </div>
          )}
          <div className="flex flex-col items-start justify-start gap-5 w-1/2">
            <div className="max-sm:row-span-3 border border-gray-400 rounded w-3xl max-sm:w-xs sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl h-auto">
              <section className="w-3xl p-6 max-sm:w-xs sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl">
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
                              <TableCell>
                                <div className="flex flex-col items-start">
                                  <span className="text-sm text-black dark:text-white font-bold">
                                    {item.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    R$ {(item.price / 100).toFixed(2)}
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
                                        setCurrentServiceId(item.id);
                                        service_form.reset({
                                          price: item.price / 100,
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
                                      onClick: () => {
                                        setCurrentServiceId(item.id);
                                        document.startViewTransition(() =>
                                          alert1Ref.current?.handleOpen()
                                        );
                                      },
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
            <div className="max-sm:row-span-3 border border-gray-400 rounded w-3xl max-sm:w-xs sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl h-auto">
              <section className="w-3xl max-sm:w-xs sm:w-xl md:w-xl lg:w-md xl:w-xl 2xl:w-xl p-6">
                <div className="flex items-center justify-between">
                  <h5 className="text-2xl font-semibold mb-6 text-start">
                    Planos
                  </h5>
                  <Button
                    className="cursor-pointer"
                    onClick={() =>
                      document.startViewTransition(() => {
                        plans_form.resetField("name", { defaultValue: "" });
                        plans_form.resetField("price", { defaultValue: 0 });
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
                <div className="h-48 w-full overflow-y-scroll overflow-x-hidden">
                  <Table>
                    <TableBody>
                      {Array.isArray(services) && services.length > 0 ? (
                        plans.map((item: ListPlansResponse, index: number) => (
                          <TableRow
                            key={index}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm flex justify-between items-center p-2"
                          >
                            <TableCell>
                              <div className="flex flex-col items-start">
                                <span className="text-sm text-black dark:text-white font-bold">
                                  {item.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  R$ {(item.price / 100).toFixed(2)}
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
                                        price: item.price / 100,
                                        name: item.name,
                                        quantityInstallments:
                                          item.quantityInstallments,
                                        dueDate: new Date(item.dueDate),
                                        description: item.description,
                                      });
                                      document.startViewTransition(() => {
                                        setCurrentPlanId(item.uuid);
                                        plansEditRef.current?.handleOpen();
                                      });
                                    },
                                  },
                                  {
                                    label: "Excluir",
                                    onClick: () => {
                                      setCurrentPlanId(item.uuid);
                                      document.startViewTransition(() =>
                                        alert2Ref.current?.handleOpen()
                                      );
                                    },
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
