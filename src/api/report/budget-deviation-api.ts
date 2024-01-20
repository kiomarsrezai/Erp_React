import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { budgetDeviationUrls } from "config/features/budget/report/budget-deviation-config";
import {
  BudgetProjectScaleModalItemShape,
  GetSingleBudgetDeviationItemShape
} from "types/data/budget/budget-deviation-type";

export const budgetDeviationApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const url = budgetDeviationUrls.getData + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleBudgetDeviationItemShape[]>
    >(url);
    return response.data;
  };

  projectReportScaleBudgetModal = async (formdata: any) => {
    const url = budgetDeviationUrls.projectReportScaleBudgetModal + this.joinFilterData(formdata);
  
    const response = await clientAxios.get<
        BaseApiResponseShape<BudgetProjectScaleModalItemShape[]>
        >(url);
    return response.data;
  };
})();
