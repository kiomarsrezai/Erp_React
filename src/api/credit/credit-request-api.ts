import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { creditRequestConfigURLS } from "config/features/credit/credit-request-config";

export const creditRequestApi = new (class extends BaseApi {
  createRequest = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      creditRequestConfigURLS.createRequest,
      formdata
    );
    return response.data;
  };
})();
