import { ICompanyServiceSchema } from "@/@types";
import { JSX, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, UseFormReturn } from "react-hook-form";

export function DEFAULT_SERVICE_FORM(
  form: UseFormReturn<ICompanyServiceSchema>
): JSX.Element {
  useEffect(() => {}, [form]);
  return (
    <Form control={form.control} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label>Nome</Label>
        <Input
          placeholder="Nome do serviço"
          className="col-span-3"
          {...form.register("name")}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label>Preço</Label>
        <Input
          placeholder="Preço do serviço"
          className="col-span-3"
          type="number"
          {...form.register("price")}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label>Estimativa</Label>
        <Input
          placeholder="30min - 45min"
          className="col-span-3"
          {...form.register("estimate")}
        />
      </div>
      {/* <div className="grid grid-cols-4 items-center gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Checkbox
            checked={form.watch("is_quantitative")}
            onCheckedChange={(e) =>
              form.setValue("is_quantitative", e as boolean)
            }
          />
          <div className="grid leading-none">
            <label htmlFor="terms1" className="whitespace-nowrap ">
              Serviço Quantitativo
            </label>
          </div>
        </div>
      </div> */}
    </Form>
  );
}
