import axios from "axios";

interface PublicScheduleInput {
  contract_date: Date;
  service_id: string;
  description: string;
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

export async function createPublicSchedule(
  organizationId: string,
  input: PublicScheduleInput
): Promise<void> {
  try {
    await axios.post<void>(
      `${API_URL}/public/schedules/${organizationId}`,
      input
    );
  } catch (error) {
    console.error(error);
    return Promise.reject("Error creating public schedule");
  }
}

export async function listPublicSchedules(): Promise<IScheduleResponse[]> {
  try {
    const data = await axios.get<IScheduleResponse[]>(
      `${API_URL}/public/schedules/list`,
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
    return data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Error listing public schedules");
  }
}
