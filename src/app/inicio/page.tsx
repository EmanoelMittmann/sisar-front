"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Business {
  id: number;
  name: string;
  imageUrl: string;
}

// Mock data - replace with actual API calls later
const recentBusinesses: Business[] = [
  {
    id: 1,
    name: "Barbearia Silva",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s",
  },
  {
    id: 2,
    name: "Salão Beauty",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s",
  },
  {
    id: 3,
    name: "Spa Relax",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s",
  },
  {
    id: 4,
    name: "Spa Relax",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&sF",
  },
  {
    id: 5,
    name: "Spa Relax",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&sF",
  },
  {
    id: 6,
    name: "Spa Relax",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&sF",
  },
  {
    id: 7,
    name: "Spa Relax",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&sF",
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6">Visitados Recentemente</h2>
        <div className="grid grid-cols-1 max-sm:gap-x-12 max-sm:grid-col-2 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-2">
          {recentBusinesses.map((business) => (
            <div
              key={business.id}
              onClick={() => router.replace(`/servicos/${business.id}`)}
              className="text-start md:text-center lg:text-center cursor-pointer"
            >
              <div className="relative w-52 h-52 hover:w-53 hover:h-53 transition-all duration-500 ease-in-out aspect-square mb-2 rounded-lg overflow-hidden">
                <Image
                  src={business.imageUrl}
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
          {recentBusinesses.map((business) => (
            <div key={business.id} className="text-center cursor-pointer">
              <div className="relative w-52 h-52 hover:w-53 hover:h-53 transition-all duration-500 ease-in-out aspect-square mb-2 rounded-lg overflow-hidden">
                <Image
                  src={business.imageUrl}
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
