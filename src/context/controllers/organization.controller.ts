"use client";
import axios from "axios";

interface ListEstabelishmentResponse {
  uuid: string;
  name: string;
  image_path: string;
}

export interface IFindUser {
  uuid: string;
  social_name: string;
  cnpj: string;
  email: string;
  phone: string;
  office: string;
  image_path: string | null;
  api_key: string | null;
  wallet_id: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function listEstablishment(): Promise<
  ListEstabelishmentResponse[]
> {
  try {
    const response = await axios.get<ListEstabelishmentResponse[]>(
      `${API_URL}/organization/list-establishment`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
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
    return Promise.reject("Error listing establishments");
  }
}

export async function getBalanceEstablishment(): Promise<number> {
  try {
    const response = await axios.get<number>(
      `${API_URL}/organization/balance`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
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
    return Promise.reject("Error getting balance for establishment");
  }
}

export async function upsertImage(data: FormData): Promise<void> {
  try {
    await axios.put(`${API_URL}/organization/upsert-image`, data, {
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error ao atualizar imagem do estabelecimento");
  }
}

export async function getEstablishmentByUuid(): Promise<IFindUser> {
  try {
    const response = await axios.get<IFindUser>(`${API_URL}/organization/me`, {
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Error getting establishment by UUID");
  }
}

export async function createSubaccount(uuid: string): Promise<void> {
  try {
    await axios.post(
      `${API_URL}/organization/create-sub-account/${uuid}`,
      {},
      {
        headers: {
          "ngrok-skip-browser-warning": true,
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem(
            "access_token"
          )}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return Promise.reject("Error creating subaccount");
  }
}
