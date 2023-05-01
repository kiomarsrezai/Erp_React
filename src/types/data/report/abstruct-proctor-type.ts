export interface GetSingleAbstructProctorItemShape {
  proctorName: string;
  mosavabCurrent: number;
  expenseCurrent: number;
  mosavabCivil: number;
  expenseCivil: number;
  percentCurrent: number;
  percentCivil: number;
  percentTotal: number;
}

export interface GetSingleAbstructProctorModalDataItemShape {
  areaName: string;
  mosavabCurrent: number;
  expenseCurrent: number;
  percentCurrent: number;
  mosavabCivil: number;
  expenseCivil: number;
  percentTotal: number;
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
}

export interface GetSingleProctorListShape {
  id: number;
  proctorName: string;
}
