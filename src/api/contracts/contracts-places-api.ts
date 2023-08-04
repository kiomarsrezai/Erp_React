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
import {
  GetSingleContractPlacesItemShape,
  GetSingleContractPlacesPrivateItemShape,
} from "types/data/contracts/contracts-places-type";
import { contractsPlacesUrls } from "config/features/contracts/conreacts-places-config";

export const contractsPlacesApi = new (class extends BaseApi {
  getData = async () => {
    const url = contractsPlacesUrls.getData;
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractPlacesItemShape[]>
    >(url);
    return response.data;
  };

  getLeftData = async (filterData: any) => {
    const url =
      contractsPlacesUrls.getLeftData + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractPlacesPrivateItemShape[]>
    >(url);
    return response.data;
  };
})();
