import { generalFieldsConfig } from "config/features/general-fields-config";

export const abstructProctorConfig = {
  YEAR: generalFieldsConfig.YEAR,
  ID: "id",
  AREA: generalFieldsConfig.AREA,
  PROCTOR: "proctorId",
  BUDGETPROCESS: generalFieldsConfig.BUDGET_METHOD,
  PAGE_NAME: "reportProctorAbstruct",
};

export const ABSTRUCT_PROCTOR_URL = "ReportApi/AllDeputy";
export const ABSTRACT_PROCTOR_MODAL_URL = "ReportApi/ProctorAreaBudget";
export const ABSTRACT_PROCTOR_MODAL_ROW_URL =
  "ReportApi/ProctorAreaBudgetDetail";
export const ABSTRACT_PROCTOR_LIST_URL = "ReportApi/ProctorList";
