import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  GetSingleCommiteDetailModalShape,
  GetSingleCommiteListShape,
  GetSingleCommiteModalShape,
} from "types/data/project/commite-project-type";
import {
  COMMITE_MEETINGS_MODAL_DETAIL_PROJECT_URL,
  COMMITE_MEETINGS_MODAL_PROJECT_URL,
  COMMITE_METTINGS_COMBO_PROJECT_URL,
  mettingsProjectConfig,
} from "config/features/project/meetings-project-config";

export const mettingsProjectApi = new (class extends BaseApi {
  getComiteList = async () => {
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleCommiteListShape[]>
    >(COMMITE_METTINGS_COMBO_PROJECT_URL);

    return response.data;
  };

  getCommiteDetail = async (id: number) => {
    const url = COMMITE_MEETINGS_MODAL_DETAIL_PROJECT_URL + `?id=${id}`;

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleCommiteDetailModalShape[]>
    >(url);

    return response.data;
  };

  getCommiteModal = async (formdata: any) => {
    const filterData = {
      [mettingsProjectConfig.commiteType]:
        formdata[mettingsProjectConfig.commiteType],
      [mettingsProjectConfig.year]: formdata[mettingsProjectConfig.year],
    };

    const url =
      COMMITE_MEETINGS_MODAL_PROJECT_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleCommiteModalShape[]>
    >(url);

    return response.data;
  };
})();
