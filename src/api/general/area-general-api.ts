import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";

interface BaseApiResponseShape<T> {
  data: T;
}

interface GetSingleSepratorItemShape {
  id: number;
  areaName: string;
}

export const areaGeneralApi = new (class extends BaseApi {
  getData = async (areaId: number) => {
    const url = `GeneralApi/AreaFetch?areaform=${areaId}`;

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorItemShape[]>
    >(url);

    return response.data;
  };
})();
