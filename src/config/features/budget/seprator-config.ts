import { generalFieldsConfig } from "../general-fields-config";

export const sepratorBudgetConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  CODING: "codingId",
  kind: "kindId",
  REQUEST_REF_STR: "requestRefStr",
  REQUEST_DATE: "requestDate",
  REQUEST_PRICE: "requestPrice",
  REQUEST_DESC: "reqDesc",
};

export const sepratorBudgetUrl = {
  areaAcc: "BudSepApi/BudgetSepratorAreaAccModal",
  areaProject: "BudSepApi/BudgetSepratorAreaProjectModal",
  codingUpdate: "BudSepApi/CodingUpdate",
  areaProjectArea: "BudSepApi/BudgetSepratorAreaProjectModal2",
  areaProjectAreaUpdate: "BudSepApi/BudgetSepratorAreaProjectModal_Update",
  confrimData: "BudSepApi/BudgetPerformanceAccept",
  confrimUpdate: "BudSepApi/BudgetPerformanceAcceptUpdate",
  abstructData: "BudSepApi/BudgetSepratorAbstractAreaModal",
  getMonthly: "BudSepApi/AbstractPerformanceMonthly",
};

export const SEPRATOR_BUDGET_URL = "BudSepApi/FetchSeprator";
export const SEPRATOR_BUDGET_TAMIN_URL = "BudSepApi/Taminetebarat";
export const SEPRATOR_BUDGET_DETAIL_URL = "BudSepApi/Details";
export const SEPRATOR_BUDGET_REFRESH_FORM_URL = "BudSepApi/RefreshSeperator";
export const SEPRATOR_BUDGET_TAMIN_INSERT_URL = "BudSepApi/TaminInsert";
export const SEPRATOR_BUDGET_TAMIN_DELETE_URL = "BudSepApi/DeleteTamin";
