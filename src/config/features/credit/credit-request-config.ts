import { generalFieldsConfig } from "../general-fields-config";

export const creditRequestConfig = {
  execute_departman_id: "executeDepartmanId",
  year: generalFieldsConfig.YEAR,
  area: generalFieldsConfig.AREA,
  user_id: "userId",
  request_date: "dateS",
  request_number: "number",
  approximate_price: "estimateAmount",
  doing_method: "doingMethodId",
  request_type: "requestKindId",
  contractor: "suppliersId",
  why_leave_ceremonies: "resonDoingMethod",
  suppliersKind: "suppliersId",
  contractorName: "contractorName",
  request_description: "description",
};

export const creditRequestConfigURLS = {
  createRequest: "RequestApi/RequestInsert",
  searchRequest: "RequestApi/GetRequestList",
};
