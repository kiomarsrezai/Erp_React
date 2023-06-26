import { generalFieldsConfig } from "config/features/general-fields-config";

export const budgetReportExpenseConfig = {
  year: generalFieldsConfig.YEAR,
  organ: generalFieldsConfig.ORGAN,
  month: generalFieldsConfig.MONTH,
};

export const budgetReportExpenseUrls = {
  getData: "ReportApi/AbstractPerformanceBudget",
};
