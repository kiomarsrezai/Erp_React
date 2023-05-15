import { generalFieldsConfig } from "../general-fields-config";

export const codingBudgetConfig = {
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  crud: "crud",
  mother_id: "motherId",
  show: "show",
  level: "levelNumber",
  code: "code",
  description: "description",
};

export const codingBudgetUrls = {
  getData: "Budget/GetCodingList",
  insert: "Budget/CodingInsert",
};
