"use client";

import { Calendar } from "@/components/custom_components/calendar";

export default function Agendar() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 flex flex-col items-center w-3xl h-3xl">
        <h4>Marcar Horário</h4>
      </section>
      <div className="px-2">
        <Calendar />
      </div>
    </div>
  );
}
