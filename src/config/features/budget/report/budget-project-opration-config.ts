import { generalFieldsConfig } from "config/features/general-fields-config";

export const budgetProjectOprationConfig = {
  year: generalFieldsConfig.YEAR,
  area: generalFieldsConfig.AREA,
  scale: "scaleId",
};

export const budgetProjectOprationUrls = {
  getData: "ReportApi/ProjectReportScale",
};
