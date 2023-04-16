import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import {
  SEPRATOR_BUDGET_URL,
  sepratorBudgetFormConfig,
} from "config/formdata/budget/seprator";

export const sepratorBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [sepratorBudgetFormConfig.YEAR]: formdata[sepratorBudgetFormConfig.YEAR],
      [sepratorBudgetFormConfig.AREA]: formdata[sepratorBudgetFormConfig.AREA],
      [sepratorBudgetFormConfig.BUDGET_METHOD]:
        formdata[sepratorBudgetFormConfig.BUDGET_METHOD],
    };

    const url = SEPRATOR_BUDGET_URL + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorItemShape[]>
    >(url);
    return response.data;
  };
})();
