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
  codingId: number;
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
  areaNameShort: string;
  mosavab: number;
  edit: number;
  expense: number;
  percentBud: number;
  supply: number;
}

export interface GetSearchPropsalModal1Data {
  id: number;
  code: string;
  description: string;
  levelNumber: number;
  crud: boolean;
  show: boolean;
}

// modal base
export interface GetModalBaseData {
  id: number;
  code: string;
  description: string;
  levelNumber: number;
}

// modal 2
export interface GetSearchPropsalModal2Data {
  id: number;
  projectCode: string;
  projectName: string;
}
