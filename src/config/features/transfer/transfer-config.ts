import { generalFieldsConfig } from "../general-fields-config";

export const transferConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  ID: "id",
  CODE: "code",
  DESCRIPTION: "description",
};

export const TRANSFER_URL = "VasetApi/VasetGetAll";
export const TRANSFER_INSERT_CODE_ACC_URL = "VasetApi/InsertCodeAcc";
export const TRANSFER_DELETE_CODE_ACC_URL = "VasetApi/DeleteCodeAcc";
export const TRANSFER_MODAL_URL = "VasetApi/GetModalVaset";
