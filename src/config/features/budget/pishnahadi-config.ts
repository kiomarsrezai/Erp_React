import { generalFieldsConfig } from "../general-fields-config";

export const proposalConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  organ: "structureId",
  coding: "codingId",
  code: "code",
  project: "projectId",
  ID: "id",
  motherid: "motherid",
  program: "programOperationDetailsId",
  detailId: "budgetDetailId",
  area_public: "areaPublicId",
  description: "description",
  mosavab: "mosavab",
};

export const proposalModal1EditConfig = {
  mosavab: "mosavab",
};

export const propsalBudgetUrls = {
  getData: "BudgetPishnahadiApi/BudgetProposalIndex",
  insert: "BudgetPishnahadiApi/BudgetProposalInlineInsert",
//   update: "BudgetPishnahadiApi/BudgetModal2CodingRead",
//   delete: "BudgetPishnahadiApi/BudgetCodingMainModal",
};
