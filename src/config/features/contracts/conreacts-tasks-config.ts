import { generalFieldsConfig } from "../general-fields-config";

export const contractsTasksConfig = {
  area: generalFieldsConfig.AREA,
  area_name: "areaName",
  number: "number",
  date: "date",
  description: "description",
  suppliers_id: "suppliersId",
  date_from: "dateFrom",
  date_end: "dateEnd",
  amount: "amount",
  suppliers_name: "suppliersName",
  doing_method: "doingMethodId",
};

export const contractsTasksUrls = {
  getData: "ContractApi/ContractRead",
  search: "ContractApi/ContractSearch",
  insert: "ContractApi/ContractInsert",
  update: "ContractApi/ContractUpdate",
  delete: "ContractApi/ContractDelete",
  // area
  areaRead: "ContractApi/ContractAreaRead",
  areaInsert: "ContractApi/ContractAreaInsert",
  areaDelete: "ContractApi/ContractAreaDelete",
  areaEdit: "ContractApi/ContractAreaUpdate",

  // install
  installRead: "ContractApi/ContractInstallmentsRead",
  insertInstal: "ContractApi/ContractInstallmentsInsert",
  deleteInstal: "ContractApi/ContractInstallmentsDelete",
  updateInstal: "ContractApi/ContractInstallmentsUpdate",
};

export const contractsTasksFormDefaultValue = {
  id: undefined,
  [contractsTasksConfig.area]: null,
  [contractsTasksConfig.area_name]: "",
  [contractsTasksConfig.doing_method]: null,
  [contractsTasksConfig.date]: new Date(), // new Date(),
  [contractsTasksConfig.description]: "",
  [contractsTasksConfig.suppliers_id]: undefined,
  [contractsTasksConfig.suppliers_name]: "",
  [contractsTasksConfig.number]: "",
  [contractsTasksConfig.date_from]: new Date(), // new Date(),
  [contractsTasksConfig.date_end]: new Date(), // new Date(),
  [contractsTasksConfig.amount]: "",
};
