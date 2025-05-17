import API from "../api";

interface ListServiceResponse {
  id: string;
  name: string;
  duration: string;
  price: number;
  is_quantitative: boolean;
  limit_for_day: number;
}

interface UpdateServiceInput {
  name: string;
  price: number;
  duration: string;
  is_quantitative: boolean;
  limit_for_day: number;
}

export class ServicesController {
  async listAll(organizationId: string): Promise<ListServiceResponse[]> {
    try {
      const response = await API.get<ListServiceResponse[]>(
        `/services/${organizationId}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error listing services");
    }
  }

  async updateService(id: string, input: UpdateServiceInput): Promise<void> {
    try {
      await API.put<void>(`/services/${id}`, input);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error updating service");
    }
  }

  async deleteService(id: string): Promise<void> {
    try {
      await API.delete<void>(`/services/${id}`);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error deleting service");
    }
  }

  async getById(id: string): Promise<ListServiceResponse> {
    try {
      const response = await API.get<ListServiceResponse>(`/services/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error getting service by ID");
    }
  }

  async createService(input: UpdateServiceInput): Promise<void> {
    try {
      await API.post<void>(`/services`, input);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error creating service");
    }
  }
}
