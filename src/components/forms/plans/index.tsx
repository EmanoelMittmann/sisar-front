import { ICompanyPlansSchema } from "@/@types";
import { DatePicker } from "@/components/custom_components/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <Label>Recorrência</Label>
        <Select
          value={form.watch("recurrent")}
          onValueChange={(value) => form.setValue("recurrent", value)}
        >
          <SelectTrigger className="w-[343px] max-sm:w-[245px] sm:w-[343px]">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WEEKLY">Semanal</SelectItem>
            <SelectItem value="MONTHLY">Mensal</SelectItem>
            <SelectItem value="YEARLY">Anual</SelectItem>
          </SelectContent>
        </Select>
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
