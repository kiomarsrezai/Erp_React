import { generalFieldsConfig } from "../general-fields-config";

export const codingBudgetConfig = {
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  id: "id",
  crud: "crud",
  mother_id: "motherId",
  show: "show",
  level: "levelNumber",
  code: "code",
  description: "description",
  id_coding_delete: "codingDeleteid",
};

export const codingBudgetUrls = {
  getData: "BudgetApi/GetCodingList",
  insert: "BudgetApi/CodingInsert",
  edit: "BudgetApi/CodingUpdate",
  delete: "BudgetApi/CodingDelete",
};
