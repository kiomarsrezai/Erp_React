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
})();
