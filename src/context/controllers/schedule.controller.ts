import API from "../api";

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

export class ScheduleController {
  async findAll(): Promise<IScheduleResponse[]> {
    try {
      const response = await API.get<IScheduleResponse[]>("/schedules");

      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error listing schedules");
    }
  }

  async findOne(id: string): Promise<IScheduleResponse> {
    try {
      const response = await API.get<IScheduleResponse>(`/schedules/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error getting schedule by ID");
    }
  }

  async create(input: ICreateScheduleInput): Promise<void> {
    try {
      await API.post<void>(`/schedules/create`, input);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error creating schedule");
    }
  }

  async delele(id: string): Promise<void> {
    try {
      await API.delete<void>(`/schedules/${id}`);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error deleting schedule");
    }
  }

  async update(id: string, input: ICreateScheduleInput): Promise<void> {
    try {
      await API.put<void>(`/schedules/${id}`, input);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error updating schedule");
    }
  }
}
