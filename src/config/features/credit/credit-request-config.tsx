import { generalFieldsConfig } from "../general-fields-config";

export const creditRequestConfig = {
  execute_departman_id: "executeDepartmanId",
  year: generalFieldsConfig.YEAR,
  area: generalFieldsConfig.AREA,
  user_id: "userId",
  request_date: "dateS",
  request_number: "number",
  approximate_price: "approximatePrice",
  doing_method: "doingMethod",
  request_type: "requestType",
};

export const creditRequestConfigURLS = {
  createRequest: "RequestApi/RequestInsert",
};
