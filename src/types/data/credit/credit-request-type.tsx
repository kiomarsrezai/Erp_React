export interface CreateCreditRequestShape {
  id: number;
  yearId: number;
  areaId: number;
  executeDepartmanId: number;
  users: string;
  doingMethodId: number;
  number: string;
  dateS: string;
}

export interface SearchCreditRequestShape {
  id: number;
  employee: string;
  number: string;
  dateS: string;
  description: string;
  estimateAmount: number;
}

export interface CreditReadRequestShape {
  id: number;
  yearId: number;
  areaId: number;
  executeDepartmanId: number;
  employee: string;
  doingMethodId: number;
  users: null;
  number: string;
  date: string;
  dateS: string;
  description: string;
  estimateAmount: string;
  resonDoingMethod: string;
}

export interface CreditReadRequestSuppliersShape {
  id: number;
  suppliersName: string;
}
