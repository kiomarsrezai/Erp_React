import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { trazUrls } from "config/features/traz/traz-config";
import { TrazItemShape } from "types/data/traz/traz-type";

export const trazApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const url = trazUrls.getData + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<TrazItemShape[]>
    >(url);
    return response.data;
  };
})();
