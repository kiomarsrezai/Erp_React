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
  mosavab: number;
  projectName: string;
  projectCode: string;
  id: number;
}

// area
export interface GetSingleSepratorAreaItemShape {
  areaNameShort: string;
  projectName: string;
  projectCode: string;
  id: number;
}

// fix
export interface GetSingleSepratorMosavabItemShape {
  code: "501020000100010001";
  description: "تعویض بخشی از باطری های U*S";
  budgetDetailId: 3844;
  mosavabPublic: 1500000000;
  budgetDetailProjectId: 3672;
  mosavabProject: 1500000000;
  budgetDetailProjectAreaId: 4675;
  mosavabArea: 1500000000;
}

// confrim
export interface GetSingleSepratorConfrimItemShape {
  id: 0;
  areaName: "string";
  userId: 0;
  firstName: "string";
  lastName: "string";
  responsibility: "string";
  date: "string";
  dateShamsi: "string";
}

// abstruct
export interface GetSingleSepratorAbstructItemShape {
  id: 0;
  areaName: "string";
  userId: 0;
  firstName: "string";
  lastName: "string";
  responsibility: "string";
  date: "string";
  dateShamsi: "string";
}
