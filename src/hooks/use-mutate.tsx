import { RequestKeys, REQUESTS } from "@/context/loader_request";

export function useMutate(key: RequestKeys) {
  const request = REQUESTS.get(key);
  const mutateAsync = (args1?: any, args2?: any): Promise<any> => {
    return request ? request(args1, args2) : Promise.resolve();
  };

  return {
    mutateAsync,
  };
}
