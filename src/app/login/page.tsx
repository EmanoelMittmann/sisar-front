"use client";
import { ILoginProps } from "@/@types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Login() {
  const navigate = useRouter();
  const form = useForm<ILoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-md h-1/3 bg-white rounded-md flex flex-col items-start justify-start gap-8 p-8">
      <FormProvider {...form}>
        <Input
          placeholder="E-mail"
          className="p-5"
          type="email"
          {...form.register("email", {
            required: "Campo obrigatório",
          })}
        />
        <Input
          placeholder="**********"
          className="p-5"
          type="password"
          {...form.register("password", {
            required: "Campo obrigatório",
          })}
        />
        <div className="flex items-end space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Lembrar</Label>
        </div>
        <h5 className="text-xs pl-1 font-bold">
          Não tem conta ? <a href="/cadastre-se">Cadastre-se aqui</a>
        </h5>
        <Button
          className="w-sm bg-[#049EA4] cursor-pointer hover:bg-[#049EA480]"
          variant="default"
          onClick={() => navigate.replace("/inicio")}
        >
          Entrar
        </Button>
      </FormProvider>
    </div>
  );
}
