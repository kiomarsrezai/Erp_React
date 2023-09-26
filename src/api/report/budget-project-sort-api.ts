import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { budgetProjectSortUrls } from "config/features/budget/report/budget-project-sort-config";

export const budgetProjectSortApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const url = budgetProjectSortUrls.getData + this.joinFilterData(formdata);

    const response = await clientAxios.get<BaseApiResponseShape<any[]>>(url);
    return response.data;
  };

  getDataModal1 = async (formdata: any) => {
    const url =
      budgetProjectSortUrls.getDataModal1 + this.joinFilterData(formdata);

    const response = await clientAxios.get<BaseApiResponseShape<any[]>>(url);
    return response.data;
  };
})();
