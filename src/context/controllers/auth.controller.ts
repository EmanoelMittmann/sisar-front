"use server";

import axios from "axios";

interface ISignInInput {
  email: string;
  password: string;
}

interface ISignInResponse {
  token: string;
}
interface ISignUpResponse {
  userId: string;
}
interface ISignUpCompanyResponse {
  message: string;
}

interface ISignUpInput {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf: string;
  phone: string;
  is_company: boolean;
  is_client: boolean;
}

interface ISignUpCompanyInput {
  organization_name: string;
  cnpj: string;
  phone: string;
  type_service: string;
  organization_email: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signin(input: ISignInInput): Promise<ISignInResponse> {
  try {
    const response = await axios.post<ISignInResponse>(
      `${API_URL}/auth/signin`,
      input
    );

    return response.data;
  } catch (error: any) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function signup(input: ISignUpInput): Promise<ISignUpResponse> {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, input);

    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Error signing up user");
  }
}

export async function signupCompany(
  user_id: string,
  input: ISignUpCompanyInput
): Promise<ISignUpCompanyResponse> {
  try {
    const response = await axios.post(
      `${API_URL}/auth/signup-company/${user_id}`,
      input
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Error signing up company");
  }
}
