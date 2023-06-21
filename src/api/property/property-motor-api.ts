import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import { contractsTasksUrls } from "config/features/contracts/conreacts-tasks-config";
import {
  GetSingleContractTaskItemShape,
  GetSingleSearchContractTaskItemShape,
  InsertContractTaskItemShape,
} from "types/data/contracts/contracts-tasks-type";
import { propertyMotorUrls } from "config/features/property/property-motor-config";

export const propertyMotorApi = new (class extends BaseApi {
  // getData = async (filterData: any) => {
  //   const url = contractsTasksUrls.getData + this.joinFilterData(filterData);
  //   const response = await clientAxios.get<
  //     BaseApiResponseShape<GetSingleContractTaskItemShape[]>
  //   >(url);
  //   return response.data;
  // };

  // search = async (filterData: any) => {
  //   const url = contractsTasksUrls.search + this.joinFilterData(filterData);
  //   const response = await clientAxios.get<
  //     BaseApiResponseShape<GetSingleSearchContractTaskItemShape[]>
  //   >(url);
  //   return response.data;
  // };

  // insert = async (filterData: any) => {
  //   const url = contractsTasksUrls.insert;
  //   const response = await clientAxios.post<
  //     BaseApiResponseShape<InsertContractTaskItemShape>
  //   >(url, filterData);
  //   return response.data;
  // };

  // update = async (filterData: any) => {
  //   const url = contractsTasksUrls.update;
  //   const response = await clientAxios.post<BaseApiResponseShape<any>>(
  //     url,
  //     filterData
  //   );
  //   return response.data;
  // };

  delete = async (filterData: any) => {
    const url = propertyMotorUrls.delete;
    const response = await clientAxios.post<BaseApiResponseShape<any>>(
      url,
      filterData
    );
    return response.data;
  };
})();
