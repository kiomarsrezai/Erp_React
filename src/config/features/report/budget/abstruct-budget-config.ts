import { generalFieldsConfig } from "config/features/general-fields-config";

export const abstructBudgetConfig = {
  YEAR: generalFieldsConfig.YEAR,
  ORGAN: generalFieldsConfig.ORGAN,
  KIND: generalFieldsConfig.kind,
  TYPE: generalFieldsConfig.TYPE,
};

export const abstructBudgetUrls = {
  getList: "ReportApi/AbstractRead",
};
