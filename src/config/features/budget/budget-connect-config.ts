import { generalFieldsConfig } from "../general-fields-config";

export const budgetConnectConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  proctor: generalFieldsConfig.PROCTOR,
};

export const budgetConnectUrls = {
  getData: "BudgetApi/BudgetConnectRead",
  updateItem: "BudgetApi/BudgetConnectUpdate",
};
