export interface GetSingleSepratorItemShape {
  description: string;
  code: string;
  mosavab: number;
  creditAmount: number;
  expense: number;
  percentBud: number;
  levelNumber: number;
  codingId: number;
  edit: number;
  crud: boolean;
}
export interface GetSingleSepratorTaminItemShape {
  bodgetId: string;
  bodgetDesc: string;
  requestDate: string;
  reqDesc: string;
  requestRefStr: string;
  requestPrice: number;
}

export interface GetSingleDetailSepratorItemShape {
  number: string;
  description: string;
  date: string;
  estimateAmount: number;
  id: number;
}

// acc
export interface GetSingleSepratorAccItemShape {
  expense: number;
  description: string;
  dateSanad: string;
  numberSanad: number;
}

// project
export interface GetSingleSepratorProjectItemShape {
  areaNameShort: string;
  projectName: string;
  projectCode: string;
  id: number;
}
