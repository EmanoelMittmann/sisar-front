"use client";
import { IRegisterProps } from "@/@types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function Register() {
  const navigate = useRouter();
  const form = useForm<IRegisterProps>({
    defaultValues: {
      name: "",
      email: "",
      is_client: false,
      is_company: false,
      password: "",
      password_confirmation: "",
      cpf: "",
    },
  });

  const mapper: Record<string, string> = {
    name: "Nome",
    email: "E-mail",
    is_client: "Cliente",
    is_company: "Empresa",
    password: "Senha",
    password_confirmation: "Confirmação de senha",
    cpf: "CPF",
  };

  return (
    <div className="w-md h-1/3 bg-white dark:bg-black rounded-md flex flex-col items-start justify-start gap-8 p-8">
      <FormProvider {...form}>
        {Object.keys(form.getValues()).map((key, index) => {
          if (key === "is_client" || key === "is_company") {
            return (
              <div className="flex items-end space-x-2" key={index}>
                <Checkbox id={key} />
                <Label htmlFor={key}>{mapper[key]}</Label>
              </div>
            );
          }
          return (
            <Input
              key={index}
              placeholder={mapper[key]}
              {...form.register(key as keyof IRegisterProps, {
                required: "Campo obrigatório",
              })}
            />
          );
        })}
        <Button
          className="w-sm bg-[#049EA4] cursor-pointer hover:bg-[#049EA480] dark:text-white"
          variant="default"
          onClick={() => navigate.replace("/inicio")}
        >
          Registre-se
        </Button>
      </FormProvider>
    </div>
  );
}
