import { generalFieldsConfig } from "../general-fields-config";

export const sepratorCreaditorBudgetConfig = {
  projectAreaId: "budgetDetailProjectAreaId",
  creaditorId: "departmanId",
  mosavab_creaditor: "mosavabDepartment",
  coding: "codingId",
  project: "projectId",
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
};

export const sepratorCreaditorBudgetUrl = {
  getData: "BudSepApi/BudgetSepratorDepartmantRead",
  getModal1Data: "BudSepApi/SepratorAreaDepartmentModal",
  getCombo: "BudSepApi/BudgetSeperatorDepartmentCom",
  connectOne: "BudSepApi/SepratorAreaDepartmentInsert",
  updateOne: "BudSepApi/BudgetSepratorAreaDepartmantUpdate",
};
