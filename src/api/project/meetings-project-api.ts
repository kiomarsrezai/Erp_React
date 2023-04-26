import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { GetSingleCommiteListShape } from "types/data/project/commite-project-type";
import { COMMITE_METTINGS_COMBO_PROJECT_URL } from "config/features/project/meetings-project-config";

export const mettingsProjectApi = new (class extends BaseApi {
  getComiteList = async () => {
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleCommiteListShape[]>
    >(COMMITE_METTINGS_COMBO_PROJECT_URL);

    return response.data;
  };
})();
