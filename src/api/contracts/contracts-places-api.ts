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
  GetSingleContractComItemShape,
  GetSingleContractPlacesItemShape,
  GetSingleContractPlacesPrivateItemShape,
} from "types/data/contracts/contracts-places-type";
import { contractsPlacesUrls } from "config/features/contracts/conreacts-places-config";

export const contractsPlacesApi = new (class extends BaseApi {
  // right
  getData = async () => {
    const url = contractsPlacesUrls.getData;
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractPlacesItemShape[]>
    >(url);
    return response.data;
  };

  insertRight = async (filterData: any) => {
    const url = contractsPlacesUrls.insertRight;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };

  editRight = async (filterData: any) => {
    const url = contractsPlacesUrls.editRight;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };

  deleteRight = async (filterData: any) => {
    const url = contractsPlacesUrls.deleteRight;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };

  // left
  getLeftData = async (filterData: any) => {
    const url =
      contractsPlacesUrls.getLeftData + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractPlacesPrivateItemShape[]>
    >(url);
    return response.data;
  };

  insertLeft = async (filterData: any) => {
    const url = contractsPlacesUrls.insertLeft;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };

  editLeft = async (filterData: any) => {
    const url = contractsPlacesUrls.editLeft;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };

  deleteLeft = async (filterData: any) => {
    const url = contractsPlacesUrls.deleteLeft;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };

  // com
  getComboKind = async () => {
    const url = contractsPlacesUrls.getCom;
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractComItemShape[]>
    >(url);
    return response.data;
  };
})();
