import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import { GetRavandChartShape } from "types/data/report/chart/ravand-chart-type";
import { ravandChartUrls } from "config/features/report/chart/ravand-chart-config";

export const ravandChartApi = new (class extends BaseApi {
  getChart = async (formdata: any) => {
    const url = ravandChartUrls.getChart + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetRavandChartShape>
    >(url);
    return response.data;
  };
})();
