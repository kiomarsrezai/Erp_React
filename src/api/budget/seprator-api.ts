import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  GetSingleDetailSepratorItemShape,
  GetSingleSepratorItemShape,
  GetSingleSepratorTaminItemShape,
} from "types/data/budget/seprator-type";
import {
  SEPRATOR_BUDGET_DETAIL_URL,
  SEPRATOR_BUDGET_TAMIN_INSERT_URL,
  SEPRATOR_BUDGET_TAMIN_URL,
  SEPRATOR_BUDGET_URL,
  sepratorBudgetConfig,
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

  linkTamin = async (formdata: any) => {
    const filterData = {
      [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
      [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
      [sepratorBudgetConfig.CODING]: formdata[sepratorBudgetConfig.CODING],
      [sepratorBudgetConfig.REQUEST_DATE]:
        formdata[sepratorBudgetConfig.REQUEST_DATE],
      [sepratorBudgetConfig.REQUEST_PRICE]:
        formdata[sepratorBudgetConfig.REQUEST_PRICE],
      [sepratorBudgetConfig.REQUEST_REF_STR]:
        formdata[sepratorBudgetConfig.REQUEST_REF_STR],
      [sepratorBudgetConfig.REQUEST_DESC]:
        formdata[sepratorBudgetConfig.REQUEST_DESC],
      [sepratorBudgetConfig.BUDGET_METHOD]:
        formdata[sepratorBudgetConfig.BUDGET_METHOD],
    };

    const url =
      SEPRATOR_BUDGET_TAMIN_INSERT_URL + this.joinFilterData(filterData);
    const response = await clientAxios.post<BaseApiResponseShape<Boolean>>(url);
    return response.data;
  };

  removeTamin = async (formdata: any) => {
    const filterData = {
      [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
      [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
      [sepratorBudgetConfig.CODING]: formdata[sepratorBudgetConfig.CODING],
      [sepratorBudgetConfig.REQUEST_DATE]:
        formdata[sepratorBudgetConfig.REQUEST_DATE],
      [sepratorBudgetConfig.REQUEST_PRICE]:
        formdata[sepratorBudgetConfig.REQUEST_PRICE],
      [sepratorBudgetConfig.REQUEST_REF_STR]:
        formdata[sepratorBudgetConfig.REQUEST_REF_STR],
      [sepratorBudgetConfig.REQUEST_DESC]:
        formdata[sepratorBudgetConfig.REQUEST_DESC],
      [sepratorBudgetConfig.BUDGET_METHOD]:
        formdata[sepratorBudgetConfig.BUDGET_METHOD],
    };

    const url = SEPRATOR_BUDGET_DETAIL_URL + this.joinFilterData(filterData);
    const response = await clientAxios.post<BaseApiResponseShape<Boolean>>(url);
    return response.data;
  };
})();
