"use client";
import { ReactNode } from "react";

export default function AuthenticationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      <section className="@container flex flex-row @3xs:justify-center @3xs:items-center">
        <div className="bg-cyan-50 dark:bg-cyan-950 w-full h-screen @max-[1800px]:hidden">
        </div>
        <div className="bg-gradient-to-b from-[#049EA460] to-[#8FBC8F15] w-4xl h-screen @max-[1800px]:w-full flex items-center justify-center shadow-cyan-100">
          <div className="flex flex-col justify-center items-center gap-4">
            <h3 className="text-4xl text-[#00000070] dark:text-white text-shadow-3xs">
              sisar
            </h3>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
