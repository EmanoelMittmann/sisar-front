"use client";
import axios from "axios";

interface ICreateScheduleInput {
  contract_date: Date;
  service_id: string;
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

interface DetailsScheduleProps {
  uuid: string;
  contract_date: Date;
  status: string;
  service: {
    name: string;
    price: string;
    duration: string;
  };
  user: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  } | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function findAllSchedules(): Promise<IScheduleResponse[]> {
  try {
    const response = await axios.get<IScheduleResponse[]>(
      `${API_URL}/schedules`,
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
    return Promise.reject("Error listing schedules");
  }
}

export async function generateCharge(
  client_id: string,
  value: number
): Promise<{ link: string }> {
  try {
    const response = await axios.post<{ link: string }>(
      `${API_URL}/schedules/new-charge`,
      {
        client_id,
        value,
      },
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
    return Promise.reject("Error generating charge");
  }
}

export async function findScheduleByOrganization(): Promise<
  IScheduleResponse[]
> {
  try {
    const response = await axios.get<IScheduleResponse[]>(
      `${API_URL}/schedules/by-company`,
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
    return Promise.reject("Error getting schedules by organization");
  }
}

export async function findScheduleById(id: string): Promise<IScheduleResponse> {
  try {
    const response = await axios.get<IScheduleResponse>(
      `${API_URL}/schedules/${id}`,
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
    return Promise.reject("Error getting schedule by ID");
  }
}

export async function createSchedule(
  input: ICreateScheduleInput
): Promise<void> {
  try {
    await axios.post<void>(`${API_URL}/schedules/create`, input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error creating schedule");
  }
}

export async function deleteSchedule(id: string): Promise<void> {
  try {
    await axios.delete<void>(`${API_URL}/schedules/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error deleting schedule");
  }
}

export async function updateSchedule(
  id: string,
  input: ICreateScheduleInput
): Promise<void> {
  try {
    await axios.put<void>(`${API_URL}/schedules/${id}`, input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error updating schedule");
  }
}

export async function detailsSchedule(
  schedule_uuid: string
): Promise<DetailsScheduleProps> {
  try {
    const response = await axios.get<DetailsScheduleProps>(
      `${API_URL}/schedules/${schedule_uuid}/details`,
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
    return Promise.reject("Error getting schedule details");
  }
}

export async function alterStatus(
  scheduleUuid: string,
  status: "PENDING" | "FINISH" | "CANCELED" | "NOT_PAY"
): Promise<void> {
  try {
    await axios.put<void>(
      `${API_URL}/schedules/alter-status/${scheduleUuid}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem(
            "access_token"
          )}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return Promise.reject("Error updating schedule status");
  }
}

export async function assocPlanToUser(
  planId: string,
  userId: string
): Promise<void> {
  try {
    await axios.post<void>(
      `${API_URL}/schedules/assoc-plan-to-user`,
      {
        plan_id: planId,
        user_id: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem(
            "access_token"
          )}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return Promise.reject("Error associating plan to user");
  }
}
