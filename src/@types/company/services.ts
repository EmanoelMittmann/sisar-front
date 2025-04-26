export interface ICompanyServiceSchema {
  name: string;
  price: string;
  estimate: string;
  is_quantitative: boolean;
}

export interface ICompanyPlansSchema {
  name: string;
  price: string;
  dueDate: Date | undefined;
  description: string;
}
