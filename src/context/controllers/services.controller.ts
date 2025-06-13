"use client";
import axios from "axios";
import { API_URL } from "../api";

export interface ListServiceResponse {
  id: string;
  name: string;
  duration: string;
  price: number;
  is_quantitative: boolean;
  limit_for_day: number;
  created_at: string;
}

interface UpdateServiceInput {
  name: string;
  price: number;
  duration: string;
  is_quantitative: boolean;
  limit_for_day: number;
}

export async function listAllServices(
  organizationId: string
): Promise<ListServiceResponse[]> {
  try {
    const response = await axios.patch<ListServiceResponse[]>(
      `${API_URL}/services/${organizationId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem(
            "access_token"
          )}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Error listing services");
  }
}

export async function updateService(
  id: string,
  input: UpdateServiceInput
): Promise<void> {
  try {
    await axios.put<void>(`${API_URL}/services/${id}`, input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error updating service");
  }
}

export async function deleteService(id: string): Promise<void> {
  try {
    await axios.delete<void>(`${API_URL}/services/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error deleting service");
  }
}

export async function getServiceById(id: string): Promise<ListServiceResponse> {
  try {
    const response = await axios.get<ListServiceResponse>(
      `${API_URL}/services/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem(
            "access_token"
          )}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Error getting service by ID");
  }
}

export async function createService(input: UpdateServiceInput): Promise<void> {
  try {
    await axios.post<void>(`${API_URL}/services`, input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error creating service");
  }
}

export async function myServicesByUser(): Promise<ListServiceResponse[]> {
  try {
    const response = await axios.patch<ListServiceResponse[]>(
      `${API_URL}/services`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem(
            "access_token"
          )}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Error get services by user");
  }
}
