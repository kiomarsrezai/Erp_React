import { generalFieldsConfig } from "../general-fields-config";

export const sepratorBudgetConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  CODING: "codingId",
  REQUEST_REF_STR: "requestRefStr",
  REQUEST_DATE: "requestDate",
  REQUEST_PRICE: "requestPrice",
  REQUEST_DESC: "reqDesc",
};

export const sepratorCreaditorBudgetConfig = {
  projectAreaId: "budgetDetailProjectAreaId",
  creaditorId: "creaditorId",

  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  CODING: "codingId",
  REQUEST_REF_STR: "requestRefStr",
  REQUEST_DATE: "requestDate",
  REQUEST_PRICE: "requestPrice",
  REQUEST_DESC: "reqDesc",
};

export const sepratorCreaditorBudgetUrl = {
  getData: "BudSepApi/BudgetSepratorCreaditorRead",
  getCombo: "BudSepApi/BudgetSeperatorCreaditorCom",
  connectOne: "BudSepApi/SepratorAreaCreaditorInsert",

  areaAcc: "BudSepApi/BudgetSepratorAreaAccModal",
  areaProject: "BudSepApi/BudgetSepratorAreaProjectModal",
  areaProjectArea: "BudSepApi/BudgetSepratorAreaProjectModal2",
  areaProjectAreaUpdate: "BudSepApi/BudgetSepratorAreaProjectModal_Update",
};

export const SEPRATOR_BUDGET_URL = "BudSepApi/FetchSeprator";
export const SEPRATOR_BUDGET_TAMIN_URL = "BudSepApi/Taminetebarat";
export const SEPRATOR_BUDGET_DETAIL_URL = "BudSepApi/Details";
export const SEPRATOR_BUDGET_REFRESH_FORM_URL = "BudSepApi/RefreshSeperator";
export const SEPRATOR_BUDGET_TAMIN_INSERT_URL = "BudSepApi/TaminInsert";
export const SEPRATOR_BUDGET_TAMIN_DELETE_URL = "BudSepApi/DeleteTamin";