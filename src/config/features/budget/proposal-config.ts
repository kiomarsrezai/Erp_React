import { generalFieldsConfig } from "../general-fields-config";

export const proposalConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  coding: "codingId",
  project: "projectId",
  ID: "id",
  motherid: "motherid",
  program: "programOperationDetailsId",
  detailId: "budgetDetailId",
  area_public: "areaPublicId",
};

export const proposalModal1EditConfig = {
  mosavab: "mosavab",
};

export const propsalBudgetUrls = {
  getData: "Budget/FetchIndex",
  getDetail: "Budget/BudgetModal1Coding",
  getMoreDetail: "Budget/BudgetModal2Coding",
  getModalBaseData: "Budget/BudgetCodingMainModal",
  // modal 1
  getSearchModal1: "Budget/GetBudgetSearchCodingModal",
  insertModal1: "Budget/BudgteModal1CodingInsert",
  editModal1: "Budget/BudgteModal1CodingUpdate",
  deleteModal1: "Budget/BudgteModal1CodingDelete",
  // modal 2
  getSearchModal2: "Budget/BudgetModal2ProjectSearch",
  insertModal2: "Budget/BudgteModal2ProjectInsert",
  editModal2: "Budget/BudgteModal2ProjectUpdate",
  deleteModal2: "Budget/BudgteModal2ProjectDelete",
  // modal 3
  getModal3: "Budget/BudgetModal3AreaRead",
  editModal3: "Budget/BudgetModal3AreaUpdate",
  insertModal3: "Budget/BudgetModal3AreaInsert",
  deleteModal3: "Budget/BudgetModal3AreaDelete",
};
