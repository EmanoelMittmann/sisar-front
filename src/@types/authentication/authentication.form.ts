export interface ILoginProps {
  email: string;
  password: string;
}

export interface IRegisterProps {
  name: string;
  email: string;
  phone: string;
  is_client: boolean;
  is_company: boolean;
  password: string;
  cpf: string;
  password_confirmation: string;
}

export interface ICompanyRequirements {
  cnpj: string;
  fantasy_name: string;
  organization_email: string;
  telephone: string;
  type_service: string;
}
