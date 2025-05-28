'use client'
import axios from "axios";

interface ICreateScheduleInput {
  contract_date: Date;
  service_id: string;
  user_id: string;
  remember_user: boolean;
}

interface IScheduleResponse {
  uuid: string;
  organization: {
    uuid: string;
    name: string;
  };
  service: {
    uuid: string;
    name: string;
  };
  contractAt: Date;
  status: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function findAllSchedules(): Promise<IScheduleResponse[]> {
  try {
    const response = await axios.get<IScheduleResponse[]>(
      `${API_URL}/schedules`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Error listing schedules");
  }
}

export async function findScheduleById(id: string): Promise<IScheduleResponse> {
  try {
    const response = await axios.get<IScheduleResponse>(
      `${API_URL}/schedules/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Error getting schedule by ID");
  }
}

export async function createSchedule(input: ICreateScheduleInput): Promise<void> {
  try {
    await axios.post<void>(
      `${API_URL}/schedules/create`,
      input,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return Promise.reject("Error creating schedule");
  }
}

export async function deleteSchedule(id: string): Promise<void> {
  try {
    await axios.delete<void>(
      `${API_URL}/schedules/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return Promise.reject("Error deleting schedule");
  }
}

export async function updateSchedule(id: string, input: ICreateScheduleInput): Promise<void> {
  try {
    await axios.put<void>(
      `${API_URL}/schedules/${id}`,
      input,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return Promise.reject("Error updating schedule");
  }
}