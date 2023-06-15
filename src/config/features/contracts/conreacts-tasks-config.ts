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
};

export const contractsTasksFormDefaultValue = {
  id: undefined,
  [contractsTasksConfig.area]: undefined,
  [contractsTasksConfig.date]: "",
  [contractsTasksConfig.description]: "",
  [contractsTasksConfig.suppliers_id]: undefined,
  [contractsTasksConfig.number]: "",
  [contractsTasksConfig.date_from]: "",
  [contractsTasksConfig.date_end]: "",
  [contractsTasksConfig.amount]: "",
};
