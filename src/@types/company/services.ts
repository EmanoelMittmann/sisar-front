export interface ICompanyServiceSchema {
  name: string;
  price: number;
  estimate: string;
  is_quantitative: boolean;
}

export interface ICompanyPlansSchema {
  name: string;
  price: number;
  quantityInstallments: number;
  dueDate: Date | undefined;
  description: string;
}
