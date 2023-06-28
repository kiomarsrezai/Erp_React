export interface GetSingleBudgetExpenseReportItemShape {
  id: number;
  areaName: string;
  mosavabRevenue: number;
  mosavabPayMotomarkez: number;
  mosavabDar_Khazane: number;
  resoures: number;
  expenseRevenue: number;
  expensePayMotomarkez: number;
  expenseDar_Khazane: number;
  mosavabCurrent: number;
  expenseCurrent: number;
  mosavabCivil: number;
  expenseCivil: number;
  mosavabFinancial: number;
  expenseFinancial: number;
  mosavabSanavati: number;
  expenseSanavati: number;
}

export interface GetSingleBudgetDetailExpenseReportItemShape {
  code: string;
  description: string;
  mosavab: number;
  expense: number;
  percent: number;
}

export interface GetSingleBudgetDetailExcelExpenseReportItemShape {
  code: string;
  description: string;
  mosavab: number;
  edit: number;
  creditAmount: number;
  levelNumber: number;
  expenseMonth: number;
  percent: number;
}
