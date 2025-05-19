"use client";
import { createContext } from "react";
import { toast } from "sonner";
import axios from "axios";

const ListenerErrorClientContext = createContext(null);

export const ListenerErrorClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      if (error.response) {
        toast.warning(error.response.data.message);
      }
      return Promise.reject(error);
    }
  );
  return (
    <ListenerErrorClientContext value={null}>
      {children}
    </ListenerErrorClientContext>
  );
};
