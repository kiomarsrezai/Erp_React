import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import { contractsTasksUrls } from "config/features/contracts/conreacts-tasks-config";
import {
  GetSingleContractTaskItemShape,
  GetSingleSearchContractTaskAreaItemShape,
  GetSingleSearchContractTaskItemShape,
  InsertContractTaskItemShape,
} from "types/data/contracts/contracts-tasks-type";
import { GetSingleContractPlacesItemShape } from "types/data/contracts/contracts-places-type";
import { contractsPlacesUrls } from "config/features/contracts/conreacts-places-config";

export const contractsPlacesApi = new (class extends BaseApi {
  getData = async (filterData: any) => {
    const url = contractsPlacesUrls.getData + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractPlacesItemShape[]>
    >(url);
    return response.data;
  };
})();
