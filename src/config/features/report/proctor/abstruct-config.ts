import { generalFieldsConfig } from "config/features/general-fields-config";

export const abstructProctorConfig = {
  YEAR: generalFieldsConfig.YEAR,
  ID: "id",
  AREA: generalFieldsConfig.AREA,
  PROCTOR: "proctorId",
  BUDGETPROCESS: generalFieldsConfig.BUDGET_METHOD,
};

export const ABSTRUCT_PROCTOR_URL = "DeputyApi/GetAllDeputy";
export const ABSTRACT_PROCTOR_MODAL_URL = "DeputyApi/ProctorAreaBudget";
