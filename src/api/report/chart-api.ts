import clientAxios from "config/axios-config";

import {
  DETAIL_REVENUE_CHART_URL,
  REVENUE_CHART_URL,
  revenueChartFormConfig,
} from "config/features/revenue-chart-config";
import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  GetRevenueChartShape,
  GetSingleDetailRevenueChartShape,
} from "types/data/report/chart/revenue-chart-type";

export const revenueChartApi = new (class extends BaseApi {
  private getFormData = (formdata: any) => {
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
      ...(formdata[revenueChartFormConfig.area] && {
        [revenueChartFormConfig.area]: formdata[revenueChartFormConfig.area],
      }),
    };

    return filterData;
  };

  getChart = async (formdata: any) => {
    const filterData = this.getFormData(formdata);

    const url = REVENUE_CHART_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetRevenueChartShape>
    >(url);
    return response.data;
  };

  chartDetail = async (formdata: any) => {
    const filterData = this.getFormData(formdata);

    const url = DETAIL_REVENUE_CHART_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleDetailRevenueChartShape[]>
    >(url);
    return response.data;
  };
})();
