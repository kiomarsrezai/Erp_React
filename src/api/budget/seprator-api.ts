import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";

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
    const url = "BudSepApi?yearId=32&areaId=1&budgetprocessId=1";
    // const filterData = {
    //   [revenueChartFormConfig.YEAR]: formdata[revenueChartFormConfig.YEAR],
    //   [revenueChartFormConfig.BUDGET_METHOD]:
    //     formdata[revenueChartFormConfig.BUDGET_METHOD],
    //   [revenueChartFormConfig.CENTER]: formdata[revenueChartFormConfig.CENTER],
    //   [revenueChartFormConfig.ORGAN]: formdata[revenueChartFormConfig.ORGAN],
    //   [revenueChartFormConfig.REVENUE]:
    //     formdata[revenueChartFormConfig.REVENUE],
    //   [revenueChartFormConfig.SALE]: formdata[revenueChartFormConfig.SALE],
    //   [revenueChartFormConfig.LAON]: formdata[revenueChartFormConfig.LAON],
    //   [revenueChartFormConfig.NIABATI]:
    //     formdata[revenueChartFormConfig.NIABATI],
    // };

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorItemShape[]>
    >(url);
    return response.data;
  };
})();
