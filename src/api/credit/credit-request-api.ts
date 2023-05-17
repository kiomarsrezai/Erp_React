import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  creditRequestConfig,
  creditRequestConfigURLS,
} from "config/features/credit/credit-request-config";
import {
  CreateCreditRequestShape,
  CreditReadRequestShape,
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
      [creditRequestConfig.request_type]:
        formdata[creditRequestConfig.request_type],
      [creditRequestConfig.doing_method]:
        formdata[creditRequestConfig.doing_method],
      [creditRequestConfig.request_description]:
        formdata[creditRequestConfig.request_description],
      [creditRequestConfig.approximate_price]:
        +formdata[creditRequestConfig.approximate_price],
      [creditRequestConfig.contractor]:
        formdata[creditRequestConfig.contractor],
      [creditRequestConfig.why_leave_ceremonies]:
        formdata[creditRequestConfig.why_leave_ceremonies],
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

  readRequest = async (requestId: number) => {
    const filterData = {
      [creditRequestConfig.request_id]: requestId,
    };

    const url =
      creditRequestConfigURLS.readRequest + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<CreditReadRequestShape>
    >(url);
    return response.data;
  };

  // request table
  insertToTable = async (formData: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      creditRequestConfigURLS.insertToTable,
      formData
    );
    return response.data;
  };

  updateTableItem = async (formData: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      creditRequestConfigURLS.updateTableItem,
      formData
    );
    return response.data;
  };
})();
