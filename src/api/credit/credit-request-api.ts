import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  creditRequestConfig,
  creditRequestConfigURLS,
} from "config/features/credit/credit-request-config";
import {
  CreateCreditRequestShape,
  CreditReadRequestBudgetRowInsertedShape,
  CreditReadRequestBudgetRowShape,
  CreditReadRequestShape,
  CreditReadRequestSuppliersShape,
  CreditReadRequestTableShape,
  CreditRequestReadContractInsertedTableShape,
  CreditRequestReadContractModalTableShape,
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

  budgetRowReadInserted = async (params: any) => {
    const url =
      creditRequestConfigURLS.budgetRowTableRead + this.joinFilterData(params);
    const response = await clientAxios.get<
      BaseApiResponseShape<CreditReadRequestBudgetRowInsertedShape[]>
    >(url);
    return response.data;
  };

  budgetRowDelete = async (params: any) => {
    const url = creditRequestConfigURLS.budgetRowDelete;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      params
    );
    return response.data;
  };

  budgetRowInsert = async (params: any) => {
    const url = creditRequestConfigURLS.budgetInsert;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      params
    );
    return response.data;
  };

  budgetRowUpdate = async (params: any) => {
    const url = creditRequestConfigURLS.budgetRowUpdate;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      params
    );
    return response.data;
  };

  // contract
  contractModal = async (params: any) => {
    const url =
      creditRequestConfigURLS.contractModal + this.joinFilterData(params);
    const response = await clientAxios.get<
      BaseApiResponseShape<CreditRequestReadContractModalTableShape[]>
    >(url);
    return response.data;
  };

  contractInserted = async (params: any) => {
    const url =
      creditRequestConfigURLS.contractInserted + this.joinFilterData(params);
    const response = await clientAxios.get<
      BaseApiResponseShape<CreditRequestReadContractInsertedTableShape[]>
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

  requestTableRead = async (formData: any) => {
    const url =
      creditRequestConfigURLS.requestTableRead + this.joinFilterData(formData);

    const response = await clientAxios.get<
      BaseApiResponseShape<CreditReadRequestTableShape[]>
    >(url);
    return response.data;
  };

  requestTableDelete = async (formData: any) => {
    const url = creditRequestConfigURLS.requestTableDelete;

    const response = await clientAxios.post<
      BaseApiResponseShape<CreditReadRequestTableShape[]>
    >(url, formData);
    return response.data;
  };
})();
