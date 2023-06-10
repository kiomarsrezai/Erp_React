import { generalFieldsConfig } from "config/features/general-fields-config";

export const budgetProjectSortConfig = {
  year: generalFieldsConfig.YEAR,
  area: generalFieldsConfig.AREA,
  kind: generalFieldsConfig.kind,
  budget: generalFieldsConfig.BUDGET_METHOD,
};

export const budgetProjectSortUrls = {
  getData: "ReportApi/BudgetShare",
};
