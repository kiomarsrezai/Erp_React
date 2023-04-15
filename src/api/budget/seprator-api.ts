import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { sepratorBudgetFormConfig } from "config/formdata/budget/seprator";

interface BaseApiResponseShape<T> {
  data: T;
}
// seprator
interface GetSingleSepratorItemShape {
  description: string;
  code: string;
  mosavab: number;
  creditAmount: number;
  expense: number;
  percentBud: number;
}

export const sepratorBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const url = "BudSepApi/FetchSeprator";
    const filterData = {
      [sepratorBudgetFormConfig.YEAR]: formdata[sepratorBudgetFormConfig.YEAR],
      [sepratorBudgetFormConfig.AREA]: formdata[sepratorBudgetFormConfig.AREA],
      [sepratorBudgetFormConfig.BUDGET_METHOD]:
        formdata[sepratorBudgetFormConfig.BUDGET_METHOD],
    };

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorItemShape[]>
    >(url + this.joinFilterData(filterData));
    return response.data;
  };
})();
