export interface GetSingleProposalItemShape {
  id: number;
  code: string;
  description: string;
  levelNumber: number;
  codingId: number;
  mosavab: number;
  expense: number;
  percentBud: number;
  edit: number;
  show: boolean;
  totalMosavab: number;
  totalExpense: number;
}

export interface GetSingleDetailProposalItemShape {
  code: string;
  description: string;
  edit: number;
  expense: number;
  id: number;
  mosavab: number;
  percentBud: number;
}

export interface GetSingleMoreDetailProposalItemShape {
  id: number;
  projectId: number;
  mosavab: number;
  edit: number;
  expense: number;
  percentBud: number;
  projectCode: number;
  projectName: string;
}

export interface GetSingleLevel5DetailProposalItemShape {
  id: number;
  areaName: string;
  mosavab: number;
  edit: number;
  expense: number;
  percentBud: number;
}
