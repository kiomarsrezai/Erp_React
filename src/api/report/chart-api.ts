import clientAxios from "config/axios-config";

import { revenueChartFormConfig } from "config/formdata/revenue-chart-config";

interface BaseApiResponseShape<T> {
  data: T;
}
// revenue chart
type GetChartShape = [string[], number[], number[], number[]];

class BaseApi {
  joinFilterData = (filterData: any) => {
    let joinedFilterData = "?";
    for (const key in filterData) {
      const value = filterData[key];
      joinedFilterData += key + "=" + value + "&";
    }
    return joinedFilterData;
  };
}

export const revenueChartApi = new (class extends BaseApi {
  getChart = async (formdata: any) => {
    const url = "BudSepApi/ChartApi";
    const filterData = {
      [revenueChartFormConfig.YEAR]: formdata[revenueChartFormConfig.YEAR],
      [revenueChartFormConfig.BUDGET_METHOD]:
        formdata[revenueChartFormConfig.BUDGET_METHOD],
      [revenueChartFormConfig.CENTER]: formdata[revenueChartFormConfig.CENTER],
      [revenueChartFormConfig.ORGAN]: formdata[revenueChartFormConfig.ORGAN],
      [revenueChartFormConfig.REVENUE]:
        formdata[revenueChartFormConfig.REVENUE],
      [revenueChartFormConfig.SALE]: formdata[revenueChartFormConfig.SALE],
      [revenueChartFormConfig.LAON]: formdata[revenueChartFormConfig.LAON],
      [revenueChartFormConfig.NIABATI]:
        formdata[revenueChartFormConfig.NIABATI],
    };

    const response = await clientAxios.get<BaseApiResponseShape<GetChartShape>>(
      url + this.joinFilterData(filterData)
    );
    return response.data;
  };
})();
