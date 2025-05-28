"use client";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
//@TODO: investigate why next 15 not support axios instance

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use((config) => {
  const bearer_token = localStorage.getItem("access_token");

  if (!bearer_token) {
    return config;
  }

  config.headers.Authorization = `Bearer ${bearer_token}`;
  return config;
});

const Unathorized = 401;

API.interceptors.response.use((response) => {
  const { status } = response;
  const navigate = useRouter();

  if (status === Unathorized) {
    localStorage.clear();
    navigate.push("/login");
  }

  return response;
});

export default API as AxiosInstance;

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
