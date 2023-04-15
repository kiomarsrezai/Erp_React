import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";

interface BaseApiResponseShape<T> {
  data: T;
}

interface SingleYearGeneralShape {
  id: number;
  yearName: string;
}

export const yearGeneralApi = new (class extends BaseApi {
  getData = async () => {
    const url = "GeneralApi/YearFetch";

    const response = await clientAxios.get<
      BaseApiResponseShape<SingleYearGeneralShape[]>
    >(url);

    return response.data;
  };
})();
