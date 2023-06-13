import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
import {
  codingBudgetConfig,
  codingBudgetUrls,
} from "config/features/budget/coding-config";

export const codingBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [codingBudgetConfig.BUDGET_METHOD]:
        formdata[codingBudgetConfig.BUDGET_METHOD],
      [codingBudgetConfig.mother_id]: formdata[codingBudgetConfig.mother_id],
    };

    const url = codingBudgetUrls.getData + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleCodingItemShape[]>
    >(url);
    return response.data;
  };

  insertItem = async (formdata: any) => {
    const url = codingBudgetUrls.insert + this.joinFilterData(formdata);
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(url);

    return response.data;
  };

  editItem = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      codingBudgetUrls.edit,
      formdata
    );

    return response.data;
  };

  deleteItem = async (id: number) => {
    const url = codingBudgetUrls.delete;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      { id }
    );

    return response.data;
  };
})();
