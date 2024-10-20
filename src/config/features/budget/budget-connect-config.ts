import { generalFieldsConfig } from "../general-fields-config";

export const budgetConnectConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  proctor: generalFieldsConfig.PROCTOR,
  coding_nature: "codingNatureId",
};

export const budgetConnectUrls = {
  getData: "BudgetApi/BudgetConnectRead",
  getNature: "BudgetApi/CodingNatureCom",
  updateItem: "BudgetApi/BudgetConnectUpdate",
};

export const budgetShareAreaUrls = {
  getData: "BudgetAreaShareApi/BudgetAreaShareRead",
  update: "BudgetAreaShareApi/BudgetAreaShareUpdate",
};
