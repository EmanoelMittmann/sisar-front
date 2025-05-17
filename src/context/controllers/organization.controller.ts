import API from "../api";

interface ListEstabelishmentResponse {
  uuid: string;
  name: string;
  image_path: string;
}

export class OrganizationController {
  async listEstablishment(): Promise<ListEstabelishmentResponse[]> {
    try {
      const response = await API.get<ListEstabelishmentResponse[]>(
        "/organization/list-establishment"
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error listing establishments");
    }
  }
}
