"use client";
import { useQuery } from "@/hooks/use-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
interface Business {
  id: string;
  name: string;
  imageUrl: string;
}

export default function Home() {
  const { data, isLoading } = useQuery("listEstablishment");

  const establistments = useMemo(() => {
    if (Array.isArray(data) && !isLoading) {
      return data.map((item: any) => ({
        id: item.uuid,
        name: item.name,
        imageUrl: item.image_path,
      })) as Business[];
    }
    return [];
  }, [data, isLoading]);

  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6">Visitados Recentemente</h2>
        <div className="grid grid-cols-1 max-sm:gap-x-12 max-sm:grid-col-2 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-2">
          {establistments.map((business) => (
            <div
              key={business.id}
              onClick={() =>
                document.startViewTransition(() =>
                  router.replace(`/servicos/${business.id}`)
                )
              }
              className="text-start md:text-center lg:text-center cursor-pointer"
            >
              <div className="relative w-52 h-52 hover:w-53 hover:h-53 transition-all duration-500 ease-in-out aspect-square mb-2 rounded-lg overflow-hidden">
                <Image
                  src={
                    business.imageUrl ||
                    "https://cdn.pixabay.com/photo/2023/02/01/00/54/company-7759278_1280.png"
                  }
                  alt={business.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-bold whitespace-nowrap">{business.name}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center ">
        <h2 className="text-2xl font-semibold mb-6">Em sua cidade</h2>
        <div className="grid grid-cols-2 max-sm:gap-x-4 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-2">
          {establistments.map((business) => (
            <div key={business.id} className="text-center cursor-pointer">
              <div className="relative w-52 h-52 hover:w-53 hover:h-53 transition-all duration-500 ease-in-out aspect-square mb-2 rounded-lg overflow-hidden">
                <Image
                  src={
                    business.imageUrl ||
                    "https://cdn.pixabay.com/photo/2023/02/01/00/54/company-7759278_1280.png"
                  }
                  alt={business.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-bold whitespace-nowrap">{business.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
