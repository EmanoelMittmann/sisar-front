"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter();
  const redirectToLogin = () => {
    document.startViewTransition(() => {
      navigate.push("/login");
    });
  };

  setTimeout(() => redirectToLogin(), 1000);
  return <div></div>;
}
