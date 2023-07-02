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

  insert = async (filterData: any) => {
    const url = contractsTasksUrls.insert;
    const response = await clientAxios.post<
      BaseApiResponseShape<InsertContractTaskItemShape>
    >(url, filterData);
    return response.data;
  };

  update = async (filterData: any) => {
    const url = contractsTasksUrls.update;
    const response = await clientAxios.post<BaseApiResponseShape<any>>(
      url,
      filterData
    );
    return response.data;
  };

  delete = async (filterData: any) => {
    const url = contractsTasksUrls.delete;
    const response = await clientAxios.post<BaseApiResponseShape<any>>(
      url,
      filterData
    );
    return response.data;
  };

  // area
  areaRead = async (filterData: any) => {
    const url = contractsTasksUrls.areaRead + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSearchContractTaskAreaItemShape[]>
    >(url);
    return response.data;
  };

  areaInsert = async (filterData: any) => {
    const url = contractsTasksUrls.areaInsert;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };

  areaDelete = async (filterData: any) => {
    const url = contractsTasksUrls.areaDelete;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };

  areaEdit = async (filterData: any) => {
    const url = contractsTasksUrls.areaEdit;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };
})();
