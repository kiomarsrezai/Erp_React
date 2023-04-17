import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import {
  ABSTRUCT_PROCTOR_URL,
  abstructProctorConfig,
} from "config/features/report/proctor/abstruct-config";
import { BaseApiResponseShape } from "types/base-type";
import { GetSingleAbstructProctorItemShape } from "types/data/report/abstruct-proctor-type";

export const abstructProctorApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [abstructProctorConfig.YEAR]: formdata[abstructProctorConfig.YEAR],
      [abstructProctorConfig.AREA]: formdata[abstructProctorConfig.AREA],
    };

    const url = ABSTRUCT_PROCTOR_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleAbstructProctorItemShape>
    >(url);
    return response.data;
  };
})();
