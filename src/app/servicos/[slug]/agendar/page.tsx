import { Calendar } from "@/components/ui/calendar";

export default function Agendar() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 flex flex-col items-center">
        <h4>Marcar Horário</h4>
        <Calendar />
      </section>
    </div>
  );
}
