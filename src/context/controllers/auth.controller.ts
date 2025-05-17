import API from "../api";

interface ISignInInput {
  email: string;
  password: string;
}

interface ISignInResponse {
  token: string;
}

interface ISignUpInput {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf: string;
  is_company: boolean;
  is_client: boolean;
}

interface ISignUpResponse {
  message: string;
}

interface ISignUpCompanyInput {
  organization_name: string;
  cnpj: string;
  phone: string;
  type_service: string;
  organization_email: string;
}

interface ISignUpCompanyResponse {
  message: string;
}

export class AuthController {
  async signin(input: ISignInInput): Promise<ISignInResponse> {
    try {
      const response = await API.post<ISignInResponse>("/auth/signin", input);

      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error signing in");
    }
  }

  async signup(input: ISignUpInput): Promise<ISignUpResponse> {
    try {
      const response = await API.post<ISignUpResponse>("/auth/signup", input);

      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error signing up");
    }
  }

  async signupCompany(
    input: ISignUpCompanyInput
  ): Promise<ISignUpCompanyResponse> {
    try {
      const response = await API.post<ISignUpCompanyResponse>(
        "/auth/signup/company",
        input
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error signing up company");
    }
  }
}
