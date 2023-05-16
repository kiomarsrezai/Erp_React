import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { GetSingleAreaShape } from "types/data/general/area-type";

export const areaGeneralApi = new (class extends BaseApi {
  getData = async (areaId: number) => {
    const url = `GeneralApi/AreaFetch?areaform=${areaId}`;

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleAreaShape[]>
    >(url);

    return response.data;
  };
})();
