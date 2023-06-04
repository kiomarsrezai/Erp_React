import { generalFieldsConfig } from "config/features/general-fields-config";

export const budgetProjectSortConfig = {
  year: generalFieldsConfig.YEAR,
  area: generalFieldsConfig.AREA,
  kind: "kindId",
};

export const budgetProjectSortUrls = {
  getData: "ReportApi/BudgetShare",
};
