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
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const DEFAULT_SERVICES: IOptions = [
  { label: "Domésticos", value: "domestic" },
  { label: "Beleza e bem-estar", value: "beauty" },
  { label: "Limpeza", value: "cleaning" },
];

export default function Company() {
  const navigate = useRouter();
  const form = useForm<ICompanyRequirements>({
    defaultValues: {
      cnpj: "",
      fantasy_name: "",
      telephone: "",
      type_service: "",
    },
  });

  const mapper: Record<string, string> = {
    cnpj: "CNPJ",
    fantasy_name: "Nome fantasia",
    telephone: "Telefone",
    type_service: "Tipo de serviço",
  };

  return (
    <div className="w-md h-1/3 bg-white rounded-md flex flex-col items-start justify-start gap-8 p-8">
      <FormProvider {...form}>
        {Object.keys(form.getValues()).map((key, index) => {
          if (key == "type_service") {
            return (
              <Select key={index}>
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
          onClick={() => navigate.replace("/inicio")}
        >
          Registre-se
        </Button>
      </FormProvider>
    </div>
  );
}
