import { generalFieldsConfig } from "../general-fields-config";

export const sepratorBudgetConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  CODING: "codingId",
  REQUEST_REF_STR: "requestRefStr",
  REQUEST_DATE: "requestDate",
  REQUEST_PRICE: "requestPrice",
  REQUEST_DESC: "reqDesc",
};

export const sepratorCreaditorBudgetConfig = {
  projectAreaId: "budgetDetailProjectAreaId",
  creaditorId: "creaditorId",
  mosavab_creaditor: "mosavabCreaditor",
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
};

export const sepratorCreaditorBudgetUrl = {
  getData: "BudSepApi/BudgetSepratorCreaditorRead",
  getCombo: "BudSepApi/BudgetSeperatorCreaditorCom",
  connectOne: "BudSepApi/SepratorAreaCreaditorInsert",
  updateOne: "BudSepApi/BudgetSepratorAreaCreaditorUpdate",
};
