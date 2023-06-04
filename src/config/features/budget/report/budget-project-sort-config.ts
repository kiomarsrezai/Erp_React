import { generalFieldsConfig } from "config/features/general-fields-config";

export const budgetProjectSortConfig = {
  year: generalFieldsConfig.YEAR,
  area: generalFieldsConfig.AREA,
  kind: generalFieldsConfig.kind,
};

export const budgetProjectSortUrls = {
  getData: "ReportApi/BudgetShare",
};
