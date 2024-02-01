export interface GetSingleBeforeProposalItemShape {
    id: number;
    codingId: number;
    code: string;
    description: string;
    mosavab: number;
    edit: number;
    creditAmount: number;
    expense: number;
    budgetNext: number;
    levelNumber: number;
    percentBud: number;
    crud: boolean;
    totalMosavab: number;
    totalExpense: number;
    percent: number;
    percent2: number;
    areaId?:number
  }

export interface GetSingleSuggestedEditItemShape {
    id: number;
    codingId: number;
    code: string;
    description: string;
    mosavab: number;
    edit: number;
    supply: number;
    expense: number;
    needEditYearNow: number;
    levelNumber: number;
    percentBud: number;
    crud: boolean;
    totalMosavab: number;
    totalExpense: number;
    percent: number;
    percent2: number;
    areaId?:number
    sumSupplyNeedEditYearNow:number
}

//   export interface GetSingleDetailProposalItemShape {
//     code: string;
//     description: string;
//     editPublic: number;
//     expense: number;
//     id: number;
//     mosavab: number;
//     codingId: number;
//     percentBud: number;
//   }

//   export interface GetSingleMoreDetailProposalItemShape {
//     id: number;
//     projectId: number;
//     mosavab: number;
//     editProject: number;
//     expense: number;
//     percentBud: number;
//     projectCode: number;
//     projectName: string;
//     areaId: number;
//   }

//   export interface GetSingleLevel5DetailProposalItemShape {
//     id: number;
//     areaName: string;
//     mosavab: number;
//     editArea: number;
//     expense: number;
//     percentBud: number;
//     supply: number;
//   }

//   export interface GetSearchPropsalModal1Data {
//     id: number;
//     code: string;
//     description: string;
//     levelNumber: number;
//     crud: boolean;
//     show: boolean;
//   }

//   // modal base
//   export interface GetModalBaseData {
//     id: number;
//     code: string;
//     description: string;
//     levelNumber: number;
//   }

//   // modal 2
//   export interface GetSearchPropsalModal2Data {
//     id: number;
//     projectCode: string;
//     projectName: string;
//   }

//   // modal info
//   export interface GetSingleProposalInfoItemShape {
//     structureId: number;
//     areaName: "منطقه 01";
//     mosavab: 990000000;
//     editArea: 990000000;
//     creditAmount: 481790912;
//     expense: 0;
//   }

//   // modal insert code
//   export interface GetSingleProposalProjectInsertCodeItemShape {
//     id: 33;
//     projectCode: "4";
//     projectName: " اجرای گذرگاه عابر پیاده واقع در سطح منطقه";
//   }
