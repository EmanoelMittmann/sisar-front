import API from "../api";

interface ListPlansResponse {
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

export class PlansController {
  async listAll(organizationId: string): Promise<ListPlansResponse[]> {
    try {
      const response = await API.get<ListPlansResponse[]>(
        `/plans/${organizationId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error listing plans");
    }
  }

  async createPlan(
    organizationId: string,
    input: ICreatePlanInput
  ): Promise<void> {
    try {
      await API.post<void>(`/plans/create/${organizationId}`, input);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error creating plan");
    }
  }

  async updatePlan(id: string, input: ICreatePlanInput): Promise<void> {
    try {
      await API.put<void>(`/plans/update/${id}`, input);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error updating plan");
    }
  }

  async deletePlan(id: string): Promise<void> {
    try {
      await API.delete<void>(`/plans/${id}`);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error deleting plan");
    }
  }

  async getById(id: string): Promise<ListPlansResponse> {
    try {
      const response = await API.patch<ListPlansResponse>(`/plans/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error getting plan by ID");
    }
  }
}
