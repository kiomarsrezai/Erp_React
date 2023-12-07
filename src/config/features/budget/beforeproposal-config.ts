import { generalFieldsConfig } from "../general-fields-config";

export const beforeproposalConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  // organ: "structureId",
  coding: "codingId",
  // code: "code",
  // description: "description",
  // mosavab: "mosavab",
  // edit: "edit",
  // // ID: "id",
  // motherid: "motherid",
  // // program: "programOperationDetailsId",
  // // detailId: "budgetDetailId",
  // // area_public: "areaPublicId",
  // budgetnext: "budgetnext",
  // levelnumber: "levelnumber",
  // expense: "expense",
  // creditamount: "creditamount",
};

// export const beforeproposalModal1EditConfig = {
//   mosavab: "mosavab",
// };

export const beforepropsalBudgetUrls = {
  getData: "BudgetPishnahadiApi/BudgetProposalRead",
  // getDetail: "BudgetApi/BudgetModal1Coding",
  // getMoreDetail: "BudgetApi/BudgetModal2CodingRead",
  // getModalBaseData: "BudgetApi/BudgetCodingMainModal",
  // modal 1
  // getSearchModal1: "BudgetApi/GetBudgetSearchCodingModal",
  // insertModal1: "BudgetApi/BudgteModal1CodingInsert",
  // editModal1: "BudgetApi/BudgteModal1CodingUpdate",
  // deleteModal1: "BudgetApi/BudgteModal1CodingDelete",
  // modal 2
  // getSearchModal2: "BudgetApi/BudgetModal2ProjectSearch",
  // insertModal2: "BudgetApi/BudgteModal2ProjectInsert",
  // editModal2: "BudgetApi/BudgteModal2ProjectUpdate",
  // deleteModal2: "BudgetApi/BudgteModal2ProjectDelete",
  // modal 3
  // getModal3: "BudgetApi/BudgetModal3AreaRead",
  // editModal3: "BudgetApi/BudgetModal3AreaUpdate",
  // insertModal3: "BudgetApi/BudgetModal3AreaInsert",
  // deleteModal3: "BudgetApi/BudgetModal3AreaDelete",

  // info modal
  // getInfo: "BudgetApi/BudgetCodingInfoModalRead",

  // insert
  insertData: "BudgetPishnahadiApi/BudgetProposalInlineInsert",
  // projectsCodeData: "BudgetApi/BudgetInlineInsertModal",
};
