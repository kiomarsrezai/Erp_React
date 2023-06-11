import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import { budgetConnectUrls } from "config/features/budget/budget-connect-config";
import {
  GetSingleBudgetConnectItemShape,
  GetSingleProjectNatureComShape,
} from "types/data/budget/budget-connect-type";

export const connectBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const url = budgetConnectUrls.getData + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleBudgetConnectItemShape[]>
    >(url);
    return response.data;
  };

  getNatureCom = async () => {
    const url = budgetConnectUrls.getNature;
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProjectNatureComShape[]>
    >(url);
    return response.data;
  };

  updateItem = async (formdata: any) => {
    const response = await clientAxios.post<
      BaseApiResponseShape<GetSingleBudgetConnectItemShape[]>
    >(budgetConnectUrls.updateItem, formdata);
    return response.data;
  };
})();
