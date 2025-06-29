"use client";
import { ILoginProps } from "@/@types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signin } from "@/context/controllers/auth.controller";
import { toast } from "sonner";
import { decodeJWT } from "@/helpers/jwt-decode";

export default function Login() {
  const navigate = useRouter();
  const form = useForm<ILoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: ILoginProps) {
    if (!data.email || !data.password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      const response = await signin(data);
      if (response.token) {
        localStorage.setItem("access_token", response.token);
        return handleRedirectByRole(response.token);
      }
    } catch (error) {
      console.error(error);
      toast.error("E-mail ou senha inválidos");
    }
  }

  async function handleRedirectByRole(access_token: string) {
    const decodedtoken = decodeJWT(access_token);

    if (decodedtoken.payload.role === "ADMIN") {
      navigate.push("/admin");
    }

    if (decodedtoken.payload.role === "USER") {
      navigate.push("/inicio");
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.which == 13) {
      event.preventDefault();
      handleSubmit(form.getValues());
    }
  });

  return (
    <div className="w-xl max-sm:w-sm sm:w-xl md:w-xl lg:w-xl h-1/3 bg-white dark:bg-black rounded-md flex flex-col items-start justify-start gap-8 p-8">
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
        {/* <div className="flex items-end space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Lembrar</Label>
        </div> */}
        <h5 className="text-xs pl-1 font-bold">
          Não tem conta ?{" "}
          <a
            className="cursor-pointer"
            onClick={() => {
              document.startViewTransition(() => {
                window.location.href = "/cadastre-se";
              });
            }}
          >
            Cadastre-se aqui
          </a>
        </h5>
        <Button
          className="w-full bg-[#049EA4] cursor-pointer hover:bg-[#049EA480] dark:text-white"
          variant="default"
          onClick={() => handleSubmit(form.getValues())}
        >
          Entrar
        </Button>
      </FormProvider>
    </div>
  );
}
