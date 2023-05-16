import { generalFieldsConfig } from "../general-fields-config";

export const proposalConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  coding: "codingId",
  project: "projectId",
  ID: "id",
};

export const propsalBudgetUrls = {
  getData: "Budget/FetchIndex",
  getDetail: "Budget/BudgetModal1Coding",
  getMoreDetail: "Budget/BudgetModal2Coding",
  getLevel5Detail: "Budget/BudgetModal3Area",
  getSearch: "Budget/GetBudgetSearchCodingModal",
};
