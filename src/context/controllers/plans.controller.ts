import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ListPlansResponse {
  uuid: string;
  name: string;
  price: number;
  recurrent: string;
  description: string;
  dueDate: Date;
}

interface ICreatePlanInput {
  name: string;
  price: number;
  recurrent: string;
  description: string;
  dueDate: Date;
}

export async function listAllPlans(
  organizationId: string
): Promise<ListPlansResponse[]> {
  try {
    const response = await axios.get<ListPlansResponse[]>(
      `${API_URL}/plans/${organizationId}`,
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
    return Promise.reject("Error listing plans");
  }
}

export async function createPlan(
  organizationId: string,
  input: ICreatePlanInput
): Promise<void> {
  try {
    await axios.post<void>(`${API_URL}/plans/create/${organizationId}`, input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error creating plan");
  }
}

export async function updatePlan(
  id: string,
  input: ICreatePlanInput
): Promise<void> {
  try {
    await axios.put<void>(`${API_URL}/plans/update/${id}`, input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error updating plan");
  }
}

export async function deletePlan(id: string): Promise<void> {
  try {
    await axios.delete<void>(`${API_URL}/plans/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject("Error deleting plan");
  }
}

export async function getPlanById(id: string): Promise<ListPlansResponse> {
  try {
    const response = await axios.patch<ListPlansResponse>(
      `${API_URL}/plans/${id}`,
      undefined,
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
    return Promise.reject("Error getting plan by ID");
  }
}

export async function listPlanByUser(): Promise<ListPlansResponse> {
  try {
    const response = await axios.get<ListPlansResponse>(
      `${API_URL}/plans/user`,
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
    return Promise.reject("Error getting list plan by user");
  }
}
