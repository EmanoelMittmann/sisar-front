"use client";
export default function Home() {
  const redirectToLogin = () => {
    document.startViewTransition(() => {
      window.location.href = "/login";
    });
  };

  setTimeout(() => redirectToLogin(), 1000);

  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-widest animate-pulse bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          SISAR
        </h1>
        <div className="mt-4">
          <div className="w-32 h-1 mx-auto bg-emerald-600 dark:bg-white animate-pulse"></div>
          <p className="mt-2 text-sm text-emerald-800 dark:text-gray-300">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
