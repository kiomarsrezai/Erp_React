import { generalFieldsConfig } from "../general-fields-config";

export const contractsPlacesConfig = {
  amlak: "amlakInfoId",
};

export const contractsPlacesUrls = {
  // right
  getData: "ContractApi/AmlakInfoRead",
  insertRight: "ContractApi/AmlakInfoInsert",
  editRight: "ContractApi/AmlakInfoUpdate",
  deleteRight: "ContractApi/AmlakInfoDelete",

  // left
  getLeftData: "ContractApi/AmlakPrivateRead",
  insertLeft: "ContractApi/AmlakPrivateInsert",
  editLeft: "ContractApi/AmlakPrivateUpdate",
  deleteLeft: "ContractApi/AmlakPrivateDelete",

  // com
  getCom: "ContractApi/AmlakInfoKindCom",
};
