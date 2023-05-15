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
  getData: "Budget/GetCodingList",
  insert: "Budget/CodingInsert",
  edit: "Budget/CodingUpdate",
  delete: "Budget/CodingDelete",
};
