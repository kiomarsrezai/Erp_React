import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import {
  SEPRATOR_BUDGET_URL,
  sepratorBudgetConfig,
} from "config/features/budget/seprator-config";

export const sepratorBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
      [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
      [sepratorBudgetConfig.BUDGET_METHOD]:
        formdata[sepratorBudgetConfig.BUDGET_METHOD],
    };

    const url = SEPRATOR_BUDGET_URL + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorItemShape[]>
    >(url);
    return response.data;
  };
})();
