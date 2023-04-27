export interface GetSingleAbstructProctorItemShape {
  متولی: string;
  mosavabCurrent: number;
  expenseCurrent: number;
  mosavabCivil: number;
  expenseCivil: number;
  percentCurrent: number;
  percentCivil: number;
  percentTotal: number;
}

export interface GetSingleAbstructProctorModalDataItemShape {
  منطقه: string;
  mosavabCurrent: number;
  expenseCurrent: number;
  " % جذب هزینه ای": number;
  mosavabCivil: number;
  expenseCivil: number;
  "% جذب سرمایه ای": number;
  "% جذب کل": number;
}

export interface GetSingleProctorListShape {
  id: number;
  proctorName: string;
}

export interface GetSingleAbstructProctorModalRowDataItemShape {
  "کد بودجه": string;
  "شرح ردیف": string;
  مصوب: number;
  عملکرد: number;
  "% جذب": number;
}

export interface GetSingleProctorListShape {
  id: number;
  proctorName: string;
}
