"use client";
import { IRegisterProps } from "@/@types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/context/controllers/auth.controller";
import { user_context } from "@/context/user_context/user_context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Register() {
  const navigate = useRouter();
  const form = useForm<IRegisterProps>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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
    phone: "Telefone",
    password: "Senha",
    password_confirmation: "Confirmação de senha",
    cpf: "CPF",
  };

  async function handleSubmit(data: IRegisterProps) {
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.password ||
      !data.password_confirmation ||
      (data.is_company && !data.cpf)
    ) {
      toast.error("Preencha todos os campos");
      return;
    }
    try {
      const response = await signup({
        confirm_password: data.password_confirmation,
        email: data.email,
        is_client: data.is_client,
        is_company: data.is_company,
        name: data.name,
        password: data.password,
        cpf: data.cpf,
        phone: data.phone,
      });

      if (response.userId) {
        user_context.setUser(response.userId);
        if (data.is_company) {
          document.startViewTransition(() => {
            navigate.push("/cadastre-se/empresa");
          });
        } else {
          toast.success("Cadastro realizado com sucesso");
          document.startViewTransition(() => {
            navigate.push("/login");
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar usuário");
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit(form.getValues());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [form]);

  return (
    <div className="w-sm sm:w-sm md:w-md lg:w-lg xl:w-xl 2xl:w-xl h-1/3 bg-white dark:bg-black rounded-md flex flex-col items-start justify-start gap-8 p-8">
      <FormProvider {...form}>
        {Object.keys(form.getValues()).map((key, index) => {
          if (key === "is_client" || key === "is_company") {
            return (
              <div className="flex items-end space-x-2" key={index}>
                <Checkbox
                  id={key}
                  checked={Boolean(form.watch(key as keyof IRegisterProps))}
                  onCheckedChange={(checked) => {
                    form.setValue(key as keyof IRegisterProps, checked);
                  }}
                />
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
          className="w-xs sm:w-xs md:w-sm lg:w-md xl:w-lg 2xl:w-lg bg-[#049EA4] cursor-pointer hover:bg-[#049EA480] dark:text-white"
          variant="default"
          onClick={() => handleSubmit(form.getValues())}
        >
          Registre-se
        </Button>
      </FormProvider>
    </div>
  );
}
