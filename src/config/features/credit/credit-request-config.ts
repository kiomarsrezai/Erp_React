import { generalFieldsConfig } from "../general-fields-config";

export const creditRequestConfig = {
  request_id: "requestId",
  execute_departman_id: "departmentId",
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
  contractorName: "contractorName",
  request_description: "description",
  employee: "employee",
};

export const creditRequestTableConfig = {
  requestId: "requestId",
  quantity: "quantity",
  price: "price",
  description: "description",
  others_description: "othersDescription",
};

export const creditRequestFormDefaultValue = {
  id: undefined,
  [creditRequestConfig.doing_method]: 1,
  [creditRequestConfig.request_type]: 1,
  [creditRequestConfig.request_date]: "",
  [creditRequestConfig.request_number]: "",
  [creditRequestConfig.year]: undefined,
  [creditRequestConfig.area]: undefined,
  [creditRequestConfig.execute_departman_id]: undefined,
  [creditRequestConfig.approximate_price]: 0,
  [creditRequestConfig.contractor]: undefined,
  [creditRequestConfig.contractorName]: undefined,
  [creditRequestConfig.why_leave_ceremonies]: "",
  [creditRequestConfig.request_description]: "",
};

export const creditRequestConfigURLS = {
  createRequest: "RequestApi/RequestCreate",
  searchRequest: "RequestApi/RequestSearch",
  updateRequest: "RequestApi/RequestUpdate",
  readRequest: "RequestApi/RequestRead",
  insertToTable: "RequestApi/RequestTableCreate",
  updateTableItem: "RequestApi/RequestTableUpdate",
  // suppliets
  readSuppliets: "RequestApi/RequestSuppliersSearch",
};
