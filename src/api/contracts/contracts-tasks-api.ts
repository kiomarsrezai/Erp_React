import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import { contractsTasksUrls } from "config/features/contracts/conreacts-tasks-config";
import {
  GetSingleContractTaskItemShape,
  GetSingleSearchContractTaskItemShape,
} from "types/data/contracts/contracts-tasks-type";

export const contractsTasksApi = new (class extends BaseApi {
  getData = async (filterData: any) => {
    const url = contractsTasksUrls.getData + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractTaskItemShape[]>
    >(url);
    return response.data;
  };

  search = async (filterData: any) => {
    const url = contractsTasksUrls.search + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSearchContractTaskItemShape[]>
    >(url);
    return response.data;
  };
})();
