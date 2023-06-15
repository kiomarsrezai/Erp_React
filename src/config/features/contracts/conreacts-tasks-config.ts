import { generalFieldsConfig } from "../general-fields-config";

export const contractsTasksConfig = {
  area: generalFieldsConfig.AREA,
  number: "number",
  date: "date",
  description: "description",
  suppliers_id: "suppliersId",
  date_from: "dateFrom",
  date_end: "dateEnd",
  amount: "amount",
};

export const contractsTasksUrls = {
  getData: "ContractApi/ContractRead",
  search: "ContractApi/ContractSearch",
  insert: "ContractApi/ContractInsert",
  update: "ContractApi/ContractUpdate",
  delete: "ContractApi/ContractDelete",
};

export const contractsTasksFormDefaultValue = {
  id: undefined,
  [contractsTasksConfig.area]: null,
  [contractsTasksConfig.date]: "",
  [contractsTasksConfig.description]: "",
  [contractsTasksConfig.suppliers_id]: undefined,
  [contractsTasksConfig.number]: "",
  [contractsTasksConfig.date_from]: null,
  [contractsTasksConfig.date_end]: null,
  [contractsTasksConfig.amount]: "",
};
