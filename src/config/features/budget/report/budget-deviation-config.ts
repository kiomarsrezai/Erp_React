import { generalFieldsConfig } from "config/features/general-fields-config";

export const budgetDeviationConfig = {
  year: generalFieldsConfig.YEAR,
  area: generalFieldsConfig.AREA,
  kind: generalFieldsConfig.kind,
};

export const budgetDeviationUrls = {
  getData: "BudSepApi/ChartBudgetDeviation",
};
