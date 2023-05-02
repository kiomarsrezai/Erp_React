import { generalFieldsConfig } from "../general-fields-config";

export const creditRequestConfig = {
  execute_departman_id: "executeDepartmanId",
  year: generalFieldsConfig.YEAR,
  area: generalFieldsConfig.AREA,
  user_id: "userId",
};

export const creditRequestConfigURLS = {
  createRequest: "RequestApi/RequestInsert",
};
