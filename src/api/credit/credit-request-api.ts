import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  creditRequestConfig,
  creditRequestConfigURLS,
} from "config/features/credit/credit-request-config";
import {
  CreateCreditRequestShape,
  CreditReadRequestBudgetRowShape,
  CreditReadRequestShape,
  CreditReadRequestSuppliersShape,
  SearchCreditRequestShape,
} from "types/data/credit/credit-request-type";

export const creditRequestApi = new (class extends BaseApi {
  createRequest = async (formdata: any) => {
    const response = await clientAxios.post<
      BaseApiResponseShape<CreateCreditRequestShape>
    >(creditRequestConfigURLS.createRequest, formdata);
    return response.data;
  };

  searchRequest = async (formdata: any) => {
    const url =
      creditRequestConfigURLS.searchRequest + this.joinFilterData(formdata);

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

  updateRequest = async (formData: any) => {
    const url = creditRequestConfigURLS.updateRequest;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formData
    );
    return response.data;
  };

  // budget row
  budgetRowRead = async (params: any) => {
    const url = creditRequestConfigURLS.budgetRow + this.joinFilterData(params);
    const response = await clientAxios.get<
      BaseApiResponseShape<CreditReadRequestBudgetRowShape[]>
    >(url);
    return response.data;
  };

  // supliets
  suplliersRead = async () => {
    const response = await clientAxios.get<
      BaseApiResponseShape<CreditReadRequestSuppliersShape[]>
    >(creditRequestConfigURLS.readSuppliets);
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
