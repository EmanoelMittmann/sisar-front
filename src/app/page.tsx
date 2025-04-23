"use client";

export default function Home() {
  const redirectToLogin = () => {
    return window.location.href = "/login";
  };

  setTimeout(() => redirectToLogin(), 2000);
  return <div></div>;
}
