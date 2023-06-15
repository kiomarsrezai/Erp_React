import { generalFieldsConfig } from "../general-fields-config";

export const mettingsProjectConfig = {
  ID: "id",
  commiteType: "commiteKindId",
  year: generalFieldsConfig.YEAR,
  desciption: "desciption",
  row: "row",
  project_id: "projectId",
};

export const mettingsProjectUrl = {
  insertDetail: "CommiteApi/CommiteDetailInsert",
  updateDetail: "CommiteApi/CommiteDetailUpdate",
  deleteDetail: "CommiteApi/CommiteDetailDelete",
  projectDetail: "CommiteApi/CommiteDetailProjectModal",

  // wbs
  wbsData: "CommiteApi/CommiteDetailWbsRead",
  wbsInsert: "CommiteApi/CommiteDetailWbsInsert",
  wbsDelete: "CommiteApi/CommiteDetailWbsDelete",
  wbsUpdate: "CommiteApi/CommiteDetailWbsUpdate",
  wbsUserList: "CommiteApi/CommiteEmployee",

  // confirmation
  confirmationData: "CommiteApi/CommiteDetailAcceptRead",
  confirmationDelete: "CommiteApi/CommiteDetailAcceptDelete",
  confirmationInsert: "CommiteApi/CommiteDetailAcceptInsert",
  confirmationApprove: "CommiteApi/CommiteDetailAcceptUpdate",

  // estimate
  estimateData: "CommiteApi/CommiteDetailEstimateRead",
  estimateDelete: "CommiteApi/CommiteDetailEstimateDelete",
  estimateInsert: "CommiteApi/CommiteDetailEstimateInsert",
  estimateApprove: "CommiteApi/CommiteDetailEstimateUpdate",
};

export const COMMITE_METTINGS_COMBO_PROJECT_URL = "CommiteApi/CommiteKindCombo";

export const COMMITE_MEETINGS_MODAL_PROJECT_URL = "CommiteApi/CommiteModal";

export const COMMITE_MEETINGS_MODAL_DETAIL_PROJECT_URL =
  "CommiteApi/CommiteDetailRead";
