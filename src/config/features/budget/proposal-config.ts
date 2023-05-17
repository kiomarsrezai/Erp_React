import { generalFieldsConfig } from "../general-fields-config";

export const proposalConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  coding: "codingId",
  project: "projectId",
  ID: "id",
};

export const proposalModal1EditConfig = {
  mosavab: "mosavab",
};

export const propsalBudgetUrls = {
  getData: "Budget/FetchIndex",
  getDetail: "Budget/BudgetModal1Coding",
  getMoreDetail: "Budget/BudgetModal2Coding",
  getLevel5Detail: "Budget/BudgetModal3Area",
  // modal 1
  getSearchModal1: "Budget/GetBudgetSearchCodingModal",
  insertModal1: "Budget/BudgteModal1CodingInsert",
  editModal1: "Budget/BudgteModal1CodingUpdate",
  deleteModal1: "Budget/BudgteModal1CodingDelete",
  // modal 2
  getSearchModal2: "Budget/SP001_BudgetModal2ProjectSearch",
  insertModal2: "Budget/BudgteModal2ProjectInsert",
};
