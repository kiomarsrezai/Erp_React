import { generalFieldsConfig } from "../general-fields-config";

export const mettingsProjectConfig = {
  ID: "id",
  commiteType: "commiteKindId",
  year: generalFieldsConfig.YEAR,
};

export const mettingsProjectUrl = {
  insertDetail: "ProjectApi/CommiteDetailInsert",
};

export const COMMITE_METTINGS_COMBO_PROJECT_URL = "ProjectApi/CommiteKindCombo";

export const COMMITE_MEETINGS_MODAL_PROJECT_URL = "ProjectApi/CommiteModal";

export const COMMITE_MEETINGS_MODAL_DETAIL_PROJECT_URL =
  "ProjectApi/CommiteDetailRead";
