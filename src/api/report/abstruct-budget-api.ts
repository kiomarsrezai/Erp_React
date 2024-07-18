import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";

import { BaseApiResponseShape } from "types/base-type";

import {
  abstructBudgetConfig,
  abstructBudgetUrls,
} from "config/features/report/budget/abstruct-budget-config";
import { GetSingleAbstructBudgetItemShape } from "types/data/report/abstruct-budget-type";

export const abstructBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [abstructBudgetConfig.YEAR]: formdata[abstructBudgetConfig.YEAR],
      [abstructBudgetConfig.KIND]: formdata[abstructBudgetConfig.KIND],
      [abstructBudgetConfig.ORGAN]: formdata[abstructBudgetConfig.ORGAN],
      [abstructBudgetConfig.TYPE]: formdata[abstructBudgetConfig.TYPE],
    };

    const url = abstructBudgetUrls.getList + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleAbstructBudgetItemShape[]>
    >(url);
    return response.data;
  };
})();
