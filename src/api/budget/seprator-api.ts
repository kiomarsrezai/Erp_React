import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  GetSingleDetailSepratorItemShape,
  GetSingleSepratorAccItemShape,
  GetSingleSepratorAreaItemShape,
  GetSingleSepratorConfrimItemShape,
  GetSingleSepratorItemShape,
  GetSingleSepratorMosavabItemShape,
  GetSingleSepratorProjectItemShape,
  GetSingleSepratorTaminItemShape,
} from "types/data/budget/seprator-type";
import {
  SEPRATOR_BUDGET_DETAIL_URL,
  SEPRATOR_BUDGET_REFRESH_FORM_URL,
  SEPRATOR_BUDGET_TAMIN_DELETE_URL,
  SEPRATOR_BUDGET_TAMIN_INSERT_URL,
  SEPRATOR_BUDGET_TAMIN_URL,
  SEPRATOR_BUDGET_URL,
  sepratorBudgetConfig,
  sepratorBudgetUrl,
} from "config/features/budget/seprator-config";

export const sepratorBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
      [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
      [sepratorBudgetConfig.BUDGET_METHOD]:
        formdata[sepratorBudgetConfig.BUDGET_METHOD],
    };

    const url = SEPRATOR_BUDGET_URL + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorItemShape[]>
    >(url);
    return response.data;
  };

  getTaminData = async (formdata: any) => {
    const filterData = {
      [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
      [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
      [sepratorBudgetConfig.BUDGET_METHOD]:
        formdata[sepratorBudgetConfig.BUDGET_METHOD],
    };

    const url = SEPRATOR_BUDGET_TAMIN_URL + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorTaminItemShape[]>
    >(url);
    return response.data;
  };

  getDetail = async (formdata: any) => {
    const filterData = {
      [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
      [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
      [sepratorBudgetConfig.CODING]: formdata[sepratorBudgetConfig.CODING],
      [sepratorBudgetConfig.BUDGET_METHOD]:
        formdata[sepratorBudgetConfig.BUDGET_METHOD],
    };

    const url = SEPRATOR_BUDGET_DETAIL_URL + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleDetailSepratorItemShape[]>
    >(url);
    return response.data;
  };

  refeshForm = async (formdata: any) => {
    const filterData = {
      [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
      [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
    };

    const url =
      SEPRATOR_BUDGET_REFRESH_FORM_URL + this.joinFilterData(filterData);
    const response = await clientAxios.get<BaseApiResponseShape<boolean>>(url);
    return response.data;
  };

  linkTamin = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<Boolean>>(
      SEPRATOR_BUDGET_TAMIN_INSERT_URL,
      formdata
    );
    return response.data;
  };

  removeTamin = async (id: number) => {
    const response = await clientAxios.post<BaseApiResponseShape<Boolean>>(
      SEPRATOR_BUDGET_TAMIN_DELETE_URL,
      { id }
    );
    return response.data;
  };

  // acc
  areaAcc = async (formdata: any) => {
    const url = sepratorBudgetUrl.areaAcc + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorAccItemShape[]>
    >(url);
    return response.data;
  };

  // project
  areaProject = async (formdata: any) => {
    const url = sepratorBudgetUrl.areaProject + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorProjectItemShape[]>
    >(url);
    return response.data;
  };

  updateCoding = async (formdata: any) => {
    const url = sepratorBudgetUrl.codingUpdate;

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );
    return response.data;
  };

  // area
  areaArea = async (formdata: any) => {
    const url =
      sepratorBudgetUrl.areaProjectArea + this.joinFilterData(formdata);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorAreaItemShape[]>
    >(url);
    return response.data;
  };

  areaAreaUpdate = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      sepratorBudgetUrl.areaProjectAreaUpdate,
      formdata
    );
    return response.data;
  };

  // fix
  fixCodeUpdate = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      "BudSepApi/CodingManualUpdate",
      formdata
    );
    return response.data;
  };

  fixMosavabRead = async (formdata: any) => {
    const url = "BudSepApi/MosavabManualModal" + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorMosavabItemShape[]>
    >(url);
    return response.data;
  };

  fixMosavabUpdate = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      "BudSepApi/MosavabManualUpdate",
      formdata
    );
    return response.data;
  };

  // confirm
  confrimDataRead = async (formdata: any) => {
    const url = sepratorBudgetUrl.confrimData + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorConfrimItemShape[]>
    >(url);
    return response.data;
  };

  confrimUpdate = async (formdata: any) => {
    const url = sepratorBudgetUrl.confrimUpdate;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );
    return response.data;
  };

  // abstruct
  abstructBudgetRead = async (formdata: any) => {
    const url = sepratorBudgetUrl.abstructData + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorConfrimItemShape[]>
    >(url);
    return response.data;
  };
})();
