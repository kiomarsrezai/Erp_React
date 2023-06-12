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
})();
