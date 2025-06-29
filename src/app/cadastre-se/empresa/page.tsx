"use client";
import { ICompanyRequirements, IOption, IOptions } from "@/@types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signupCompany } from "@/context/controllers/auth.controller";
import { user_context } from "@/context/user_context/user_context";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const DEFAULT_SERVICES: IOptions = [
  { label: "Domésticos", value: "domestic" },
  { label: "Beleza e bem-estar", value: "beauty" },
  { label: "Limpeza", value: "cleaning" },
];

export default function Company() {
  const form = useForm<ICompanyRequirements>({
    defaultValues: {
      cnpj: "",
      fantasy_name: "",
      telephone: "",
      organization_email: "",
      type_service: "",
    },
  });

  const mapper: Record<string, string> = {
    organization_email: "E-mail da empresa",
    type_service: "Tipo de serviço",
    fantasy_name: "Nome fantasia",
    telephone: "Telefone",
    cnpj: "CNPJ",
  };

  async function handleSubmit(userId: string, data: ICompanyRequirements) {
    try {
      const response = await signupCompany(userId, {
        cnpj: data.cnpj,
        organization_name: data.fantasy_name,
        organization_email: data.organization_email,
        phone: data.telephone,
        type_service: data.type_service,
      });

      if (response.message) {
        toast.success("Cadastro realizado com sucesso");
        document.startViewTransition(() => {
          window.location.href = "/login";
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar a empresa, tente novamente");
    }
  }

  return (
    <div className="w-md h-1/3 bg-white dark:bg-black rounded-md flex flex-col items-start justify-start gap-8 p-8">
      <FormProvider {...form}>
        {Object.keys(form.getValues()).map((key, index) => {
          if (key == "type_service") {
            return (
              <Select
                key={index}
                defaultValue={form.watch(key as keyof ICompanyRequirements)}
                onValueChange={(value) =>
                  form.setValue(key as keyof ICompanyRequirements, value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {DEFAULT_SERVICES.map((option: IOption, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }
          return (
            <Input
              key={index}
              placeholder={mapper[key]}
              {...form.register(key as keyof ICompanyRequirements, {
                required: "Campo obrigatório",
              })}
            />
          );
        })}
        <Button
          className="w-sm bg-[#049EA4] cursor-pointer hover:bg-[#049EA480]"
          variant="default"
          onClick={() => {
            const user = user_context.getUser();
            handleSubmit(user as string, form.getValues());
          }}
        >
          Registre-se
        </Button>
      </FormProvider>
    </div>
  );
}
