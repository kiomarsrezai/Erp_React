import { generalFieldsConfig } from "config/features/general-fields-config";

export const budgetReportExpenseConfig = {
  year: generalFieldsConfig.YEAR,
  organ: generalFieldsConfig.ORGAN,
};

export const budgetReportExpenseUrls = {
  getData: "ReportApi/AbstractPerformanceBudget",
};
