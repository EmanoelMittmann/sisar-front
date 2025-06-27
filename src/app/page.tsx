"use client";
export default function Home() {
  const redirectToLogin = () => {
    document.startViewTransition(() => {
      window.location.href = "/login";
    });
  };

  setTimeout(() => redirectToLogin(), 1000);
  return <div></div>;
}
