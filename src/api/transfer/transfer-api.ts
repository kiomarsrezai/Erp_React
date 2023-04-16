import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { GetSingleTransferItemShape } from "types/data/transfer/transfer-type";
import { BaseApiResponseShape } from "types/base-type";
import {
  TRANSFER_URL,
  transferFormConfig,
} from "config/formdata/transfer/transfer";

export const transferApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [transferFormConfig.YEAR]: formdata[transferFormConfig.YEAR],
      [transferFormConfig.AREA]: formdata[transferFormConfig.AREA],
      [transferFormConfig.BUDGET_METHOD]:
        formdata[transferFormConfig.BUDGET_METHOD],
    };

    const url = TRANSFER_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleTransferItemShape[]>
    >(url);
    return response.data;
  };
})();
