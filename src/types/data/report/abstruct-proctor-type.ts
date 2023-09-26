export interface GetSingleAbstructProctorItemShape {
  proctorName: string;
  mosavabCurrent: number;
  expenseCurrent: number;
  mosavabCivil: number;
  expenseCivil: number;
  percentCurrent: number;
  percentCivil: number;
  percentTotal: number;
  percentCreditAmountCivil: number;
  percentCreditAmountCurrent: number;
  creditAmountCivil: number;
  creditAmountCurrent: number;
}

export interface GetSingleAbstructProctorModalDataItemShape {
  areaName: string;
  mosavabCurrent: number;
  expenseCurrent: number;
  percentCurrent: number;
  mosavabCivil: number;
  expenseCivil: number;
  percentCivil: number;
  percentTotal: number;
  percentCreditAmountCivil: number;
  percentCreditAmountCurrent: number;
  creditAmountCivil: number;
  creditAmountCurrent: number;
}

export interface GetSingleProctorListShape {
  id: number;
  proctorName: string;
}

export interface GetSingleAbstructProctorModalRowDataItemShape {
  code: string;
  description: string;
  mosavab: number;
  expense: number;
  percent: number;
  supply: number;
}

export interface GetSingleProctorListShape {
  id: number;
  proctorName: string;
}

export interface GetSingleAbstructProctorModal1InfoItemShape {
  number: string;
  date: string;
  dateShamsi: string;
  description: string;
  estimateAmount: number;
  code: string;
  title: string;
}
