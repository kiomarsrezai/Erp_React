import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { sepratorBudgetFormConfig } from "config/formdata/budget/seprator";

interface BaseApiResponseShape<T> {
  data: T;
}

interface GetSingleTransferItemShape {
  description: string;
  code: string;
  mosavab: number;
  codeAcc: number;
  titleAcc: string;
}

export const transferApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const url = "VasetApi/VasetGetAll";
    const filterData = {
      [sepratorBudgetFormConfig.YEAR]: formdata[sepratorBudgetFormConfig.YEAR],
      [sepratorBudgetFormConfig.AREA]: formdata[sepratorBudgetFormConfig.AREA],
      [sepratorBudgetFormConfig.BUDGET_METHOD]:
        formdata[sepratorBudgetFormConfig.BUDGET_METHOD],
    };

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleTransferItemShape[]>
    >(url + this.joinFilterData(filterData));
    return response.data;
  };
})();
