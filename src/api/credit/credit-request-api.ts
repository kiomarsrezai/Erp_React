import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  creditRequestConfig,
  creditRequestConfigURLS,
} from "config/features/credit/credit-request-config";
import {
  CreateCreditRequestShape,
  SearchCreditRequestShape,
} from "types/data/credit/credit-request-type";

export const creditRequestApi = new (class extends BaseApi {
  createRequest = async (formdata: any) => {
    const filterData = {
      [creditRequestConfig.year]: formdata[creditRequestConfig.year],
      [creditRequestConfig.area]: formdata[creditRequestConfig.area],
      [creditRequestConfig.user_id]: formdata[creditRequestConfig.user_id],
      [creditRequestConfig.execute_departman_id]:
        formdata[creditRequestConfig.execute_departman_id],
    };

    const response = await clientAxios.post<
      BaseApiResponseShape<CreateCreditRequestShape>
    >(creditRequestConfigURLS.createRequest, filterData);
    return response.data;
  };

  searchRequest = async (formdata: any) => {
    const filterData = {
      [creditRequestConfig.year]: formdata[creditRequestConfig.year],
      [creditRequestConfig.area]: formdata[creditRequestConfig.area],
      [creditRequestConfig.execute_departman_id]:
        formdata[creditRequestConfig.execute_departman_id],
    };

    const url =
      creditRequestConfigURLS.searchRequest + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<SearchCreditRequestShape[]>
    >(url);
    return response.data;
  };
})();
