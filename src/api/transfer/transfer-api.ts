import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { GetSingleTransferItemShape } from "types/data/transfer/transfer-type";
import { BaseApiResponseShape } from "types/base-type";
import {
  TRANSFER_URL,
  transferConfig,
} from "config/features/transfer/transfer-config";

export const transferApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [transferConfig.YEAR]: formdata[transferConfig.YEAR],
      [transferConfig.AREA]: formdata[transferConfig.AREA],
      [transferConfig.BUDGET_METHOD]: formdata[transferConfig.BUDGET_METHOD],
    };

    const url = TRANSFER_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleTransferItemShape[]>
    >(url);
    return response.data;
  };
})();
