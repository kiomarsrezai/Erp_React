export interface GetSingleContractMotalebItemShape {
  id: number;
  date: string;
  dateShamsi: string;
  number: number;
  amount: number;
}

export interface GetSingleContractLeftDataItemShape {
  id: number;
  suppliersName: string;
  number: string;
  yearName: string;
  monthId: number;
  reciveAmount: number;
}

export interface GetSingleContractLeftModalDataItemShape {
  id: number;
  yearName: string;
  monthId: number;
  monthlyAmount: number;
  description: string;
}
