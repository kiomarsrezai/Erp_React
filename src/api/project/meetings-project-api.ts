import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  GetSingleCommiteDetailConfirmationModalShape,
  GetSingleCommiteDetailEstimateModalShape,
  GetSingleCommiteDetailModalShape,
  GetSingleCommiteDetailProjectModalShape,
  GetSingleCommiteDetailWbsModalShape,
  GetSingleCommiteListShape,
  GetSingleCommiteModalShape,
  GetSingleWbsUserListShape,
} from "types/data/project/commite-project-type";
import {
  COMMITE_MEETINGS_MODAL_DETAIL_PROJECT_URL,
  COMMITE_MEETINGS_MODAL_PROJECT_URL,
  COMMITE_METTINGS_COMBO_PROJECT_URL,
  mettingsProjectConfig,
  mettingsProjectUrl,
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

  insertCommiteDetail = async (formdata: any) => {
    const url = mettingsProjectUrl.insertDetail;

    const response = await clientAxios.post<
      BaseApiResponseShape<GetSingleCommiteModalShape[]>
    >(url, formdata);

    return response.data;
  };

  updateCommiteDetail = async (formdata: any) => {
    const url = mettingsProjectUrl.updateDetail;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );

    return response.data;
  };

  deleteCommiteDetail = async (formdata: any) => {
    const url = mettingsProjectUrl.deleteDetail;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );

    return response.data;
  };

  dataProjectCommiteDetail = async () => {
    const url = mettingsProjectUrl.projectDetail;

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleCommiteDetailProjectModalShape[]>
    >(url);

    return response.data;
  };

  // wbs
  wbsDataModal = async (formdata: any) => {
    const url = mettingsProjectUrl.wbsData + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleCommiteDetailWbsModalShape[]>
    >(url);

    return response.data;
  };

  wbsInsert = async (formdata: any) => {
    const url = mettingsProjectUrl.wbsInsert;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );

    return response.data;
  };

  wbsUpdate = async (formdata: any) => {
    const url = mettingsProjectUrl.wbsUpdate;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );

    return response.data;
  };

  wbsDelete = async (formdata: any) => {
    const url = mettingsProjectUrl.wbsDelete;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );

    return response.data;
  };

  getWbsUserList = async () => {
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleWbsUserListShape[]>
    >(mettingsProjectUrl.wbsUserList);

    return response.data;
  };

  // confirmation
  confirmationDataModal = async (formdata: any) => {
    const url =
      mettingsProjectUrl.confirmationData + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleCommiteDetailConfirmationModalShape[]>
    >(url);

    return response.data;
  };

  confirmationDelete = async (formdata: any) => {
    const url = mettingsProjectUrl.confirmationDelete;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );

    return response.data;
  };

  confirmationInsert = async (formdata: any) => {
    const url = mettingsProjectUrl.confirmationInsert;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );

    return response.data;
  };

  confirmationApprove = async (formdata: any) => {
    const url = mettingsProjectUrl.confirmationApprove;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );

    return response.data;
  };

  // estimate
  estimateDataModal = async (formdata: any) => {
    const url = mettingsProjectUrl.estimateData + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleCommiteDetailEstimateModalShape[]>
    >(url);

    return response.data;
  };

  estimateDelete = async (formdata: any) => {
    const url = mettingsProjectUrl.estimateDelete;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );

    return response.data;
  };
})();
