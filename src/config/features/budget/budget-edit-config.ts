import { generalFieldsConfig } from "../general-fields-config";

export const budgetEditConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
};

export const proposalModal1EditConfig = {
  mosavab: "mosavab",
};

export const budgetEditUrls = {
  getData: "BudgetEditApi/BudgetEditRead",
  insertItem: "BudgetEditApi/BudgetEditInsert",
  deleteItem: "BudgetEditApi/BudgetEditDelete",
  updateItem: "BudgetEditApi/BudgetEditUpdate",
};
