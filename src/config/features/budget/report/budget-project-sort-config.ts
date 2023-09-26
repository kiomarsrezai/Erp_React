import { generalFieldsConfig } from "config/features/general-fields-config";

export const budgetProjectSortConfig = {
  year: generalFieldsConfig.YEAR,
  area: generalFieldsConfig.AREA,
  coding: "codingId",
  kind: generalFieldsConfig.kind,
  budget: generalFieldsConfig.BUDGET_METHOD,
};

export const budgetProjectSortUrls = {
  getData: "ReportApi/BudgetShare",
  getDataModal1: "ReportApi/BudgetShareModal",
};
