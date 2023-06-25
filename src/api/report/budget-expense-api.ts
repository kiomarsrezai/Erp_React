import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { budgetDeviationUrls } from "config/features/budget/report/budget-deviation-config";
import { GetSingleBudgetDeviationItemShape } from "types/data/budget/budget-deviation-type";
import { budgetProjectOprationUrls } from "config/features/budget/report/budget-project-opration-config";
import { GetSingleBudgetProjectOprationItemShape } from "types/data/budget/budget-project-opration-type";
import { GetSingleBudgetExpenseReportItemShape } from "types/data/budget/budget-report-expense-type";
import {
  budgetReportExpenseConfig,
  budgetReportExpenseUrls,
} from "config/features/budget/report/budget-report-expense-config";

export const budgetReportExpenseApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const url = budgetReportExpenseUrls.getData + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleBudgetExpenseReportItemShape[]>
    >(url);
    return response.data;
  };
})();
