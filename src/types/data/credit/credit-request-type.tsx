export interface CreateCreditRequestShape {
  id: number;
  yearId: number;
  areaId: number;
  executeDepartmanId: number;
  users: string;
  doingMethodId: number;
  number: string;
  date: string;
}

export interface SearchCreditRequestShape {
  id: number;
  employee: string;
  number: string;
  description: string;
  estimateAmount: number;
  date: string;
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
  description: string;
  estimateAmount: string;
  resonDoingMethod: string;
  suppliersId: number;
  suppliersName: string;
}

export interface CreditReadRequestSuppliersShape {
  id: number;
  suppliersName: string;
}

export interface CreditReadRequestBudgetRowShape {
  code: string;
  description: string;
  id: number;
  requestBudgetAmount: number;
  project: string;
  yearName: string;
}

export interface CreditReadRequestBudgetRowInsertedShape {
  code: string;
  description: string;
  id: number;
  requestBudgetAmount: number;
  project: string;
  yearName: string;
}

// request table
export interface CreditReadRequestTableShape {
  id: number;
  description: string;
  quantity: number;
  scale: string;
  price: number;
  amount: number;
  othersDescription: string;
}
