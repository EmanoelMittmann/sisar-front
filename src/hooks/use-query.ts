"use client";
import { RequestKeys, REQUESTS } from "@/context/loader_request";
import { startTransition, useEffect, useState } from "react";

export function useQuery(
  key: RequestKeys,
  params?: any[]
): {
  data: any;
  isLoading: boolean;
  error: string | null;
} {
  const get_request = REQUESTS.get(key);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!get_request) {
    throw new Error(`Request with key "${key}" not found in REQUESTS_MAPPER`);
  }

  useEffect(() => {
    setIsLoading(true);
    startTransition(() => {
      get_request(params)
        .then((data) => {
          setResult(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.response.data.message || "An error occurred");
          setIsLoading(false);
        });
    });
  }, [key, get_request, params]);
  return {
    data: result,
    isLoading,
    error,
  };
}
