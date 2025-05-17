import API from "../api";

interface PublicScheduleInput {
  contract_date: Date;
  service_id: string;
  description: string;
}

export class PublicScheduleController {
  async toPublicSchedule(
    organizationId: string,
    input: PublicScheduleInput
  ): Promise<void> {
    try {
      await API.post<void>(`/public/schedules/${organizationId}`, input);
    } catch (error) {
      console.error(error);
      return Promise.reject("Error creating public schedule");
    }
  }
}
