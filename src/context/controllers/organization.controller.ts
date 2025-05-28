"use client";
import axios from "axios";

interface ListEstabelishmentResponse {
  uuid: string;
  name: string;
  image_path: string;
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
