import { generalFieldsConfig } from "config/features/general-fields-config";

export const abstructBudgetConfig = {
  YEAR: generalFieldsConfig.YEAR,
  ORGAN: generalFieldsConfig.ORGAN,
  KIND: "kindId",
};

export const abstructBudgetUrls = {
  getList: "GeneralApi/GetAbstractList",
};
