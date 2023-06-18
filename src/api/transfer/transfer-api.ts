import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import {
  GetSingleTransferItemShape,
  GetSingleTransferModalDataItemShape,
} from "types/data/transfer/transfer-type";
import { BaseApiResponseShape } from "types/base-type";
import {
  TRANSFER_DELETE_CODE_ACC_URL,
  TRANSFER_DELETE_ROW,
  TRANSFER_INSERT_CODE_ACC_URL,
  TRANSFER_LINK_CODE_ACC_URL,
  TRANSFER_MODAL_URL,
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

  getModalData = async (formdata: any) => {
    const filterData = {
      [transferConfig.ID]: formdata[transferConfig.ID],
      [transferConfig.CODE]: formdata[transferConfig.CODE],
      [transferConfig.DESCRIPTION]: formdata[transferConfig.DESCRIPTION],
      [transferConfig.AREA]: formdata[transferConfig.AREA],
      [transferConfig.YEAR]: formdata[transferConfig.YEAR],
    };

    const url = TRANSFER_MODAL_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleTransferModalDataItemShape[]>
    >(url);
    return response.data;
  };

  deleteRow = async (id: number) => {
    const url = TRANSFER_DELETE_ROW + "?id=" + id;

    const response = await clientAxios.get<BaseApiResponseShape<boolean>>(url);
    return response.data;
  };
  // acc
  insertCodeAcc = async (id: number) => {
    const url = TRANSFER_INSERT_CODE_ACC_URL + "?id=" + id;

    const response = await clientAxios.get<BaseApiResponseShape<boolean>>(url);
    return response.data;
  };

  deleteCodeAcc = async (id: number) => {
    const url = TRANSFER_DELETE_CODE_ACC_URL + "?id=" + id;

    const response = await clientAxios.get<BaseApiResponseShape<boolean>>(url);
    return response.data;
  };

  linkCodeAcc = async (formdata: any) => {
    const filterData = {
      [transferConfig.ID]: formdata[transferConfig.ID],
      [transferConfig.AREA]: formdata[transferConfig.AREA],
      [transferConfig.CODE_ACC]: formdata[transferConfig.CODE_ACC],
      [transferConfig.TITLE_ACC]: formdata[transferConfig.TITLE_ACC],
    };

    const url = TRANSFER_LINK_CODE_ACC_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<BaseApiResponseShape<boolean>>(url);
    return response.data;
  };
})();
