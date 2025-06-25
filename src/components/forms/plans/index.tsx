import { ICompanyPlansSchema } from "@/@types";
import { DatePicker } from "@/components/custom_components/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JSX } from "react";
import { Form, UseFormReturn } from "react-hook-form";

export function DEFAULT_PLANS_FORM(
  form: UseFormReturn<ICompanyPlansSchema>
): JSX.Element {
  return (
    <Form control={form.control} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label>Nome</Label>
        <Input
          placeholder="Nome do plano"
          className="col-span-3"
          {...form.register("name")}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label>Preço</Label>
        <Input
          type="number"
          placeholder="Preço do plano"
          className=" col-span-3"
          {...form.register("price")}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label>Parcelas</Label>
        <Input
          type="number"
          placeholder="Numero de parcelas"
          className=" col-span-3"
          {...form.register("quantityInstallments")}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label>Vencimento</Label>
        <DatePicker
          date={form.watch("dueDate") as Date}
          setDate={(e: Date | undefined) => form.setValue("dueDate", e)}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Textarea
          placeholder="Escreva sua descriçao aqui"
          className="col-span-4"
          {...form.register("description")}
        />
      </div>
    </Form>
  );
}
