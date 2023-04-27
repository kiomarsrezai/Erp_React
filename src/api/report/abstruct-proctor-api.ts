import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import {
  ABSTRACT_PROCTOR_LIST_URL,
  ABSTRACT_PROCTOR_MODAL_ROW_URL,
  ABSTRACT_PROCTOR_MODAL_URL,
  ABSTRUCT_PROCTOR_URL,
  abstructProctorConfig,
} from "config/features/report/proctor/abstruct-config";
import { BaseApiResponseShape } from "types/base-type";
import {
  GetSingleAbstructProctorItemShape,
  GetSingleAbstructProctorModalDataItemShape,
  GetSingleAbstructProctorModalRowDataItemShape,
  GetSingleProctorListShape,
} from "types/data/report/abstruct-proctor-type";

export const abstructProctorApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [abstructProctorConfig.YEAR]: formdata[abstructProctorConfig.YEAR],
      [abstructProctorConfig.AREA]: formdata[abstructProctorConfig.AREA],
      [abstructProctorConfig.BUDGETPROCESS]:
        formdata[abstructProctorConfig.BUDGETPROCESS],
      [abstructProctorConfig.PROCTOR]: formdata[abstructProctorConfig.PROCTOR],
    };

    const url = ABSTRUCT_PROCTOR_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleAbstructProctorItemShape[]>
    >(url);
    return response.data;
  };

  getModalData = async (id: number) => {
    const filterData = {
      [abstructProctorConfig.ID]: id,
    };

    const url = ABSTRACT_PROCTOR_MODAL_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleAbstructProctorModalDataItemShape[]>
    >(url);
    return response.data;
  };

  getModalRowData = async (formdata: any) => {
    const filterData = {
      [abstructProctorConfig.YEAR]: formdata[abstructProctorConfig.YEAR],
      [abstructProctorConfig.PROCTOR]: formdata[abstructProctorConfig.PROCTOR],
      [abstructProctorConfig.AREA]: formdata[abstructProctorConfig.AREA],
      [abstructProctorConfig.BUDGETPROCESS]:
        formdata[abstructProctorConfig.BUDGETPROCESS],
    };

    const url =
      ABSTRACT_PROCTOR_MODAL_ROW_URL + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleAbstructProctorModalRowDataItemShape[]>
    >(url);
    return response.data;
  };

  getProctorList = async () => {
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProctorListShape[]>
    >(ABSTRACT_PROCTOR_LIST_URL);

    return response.data;
  };
})();
