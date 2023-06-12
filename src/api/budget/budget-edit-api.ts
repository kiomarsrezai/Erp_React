import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { budgetEditUrls } from "config/features/budget/budget-edit-config";
import { GetSingleBudgetEditItemShape } from "types/data/budget/budget-edit-type";

export const budgetEditApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const url = budgetEditUrls.getData + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleBudgetEditItemShape[]>
    >(url);
    return response.data;
  };

  insertItem = async (formdata: any) => {
    const url = budgetEditUrls.insertItem;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );
    return response.data;
  };

  deleteItem = async (formdata: any) => {
    const url = budgetEditUrls.deleteItem;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );
    return response.data;
  };

  updateItem = async (formdata: any) => {
    const url = budgetEditUrls.updateItem;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );
    return response.data;
  };
})();
