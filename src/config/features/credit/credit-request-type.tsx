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
  rate: number;
  description: string;
  unit: string;
  price: number;
}
