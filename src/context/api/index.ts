"use server";
import axios from "axios";
import { useRouter } from "next/router";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use((config) => {
  const bearer_token = localStorage.getItem("access_token");
  const navigate = useRouter();
  if (!bearer_token) {
    localStorage.clear();
    navigate.push("/login");
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

export default API;
