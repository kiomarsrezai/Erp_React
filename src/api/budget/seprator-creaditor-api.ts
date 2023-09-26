import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import { sepratorCreaditorBudgetUrl } from "config/features/budget/seprator-creaditro-config";
import {
  GetSingleSepratorCreaditorComboItemShape,
  GetSingleSepratorCreaditorItemShape,
  GetSingleSepratorCreaditorModal1ItemShape,
} from "types/data/budget/seprator-creaditor-type";

export const sepratorCreaditorBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const url =
      sepratorCreaditorBudgetUrl.getData + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorCreaditorItemShape[]>
    >(url);
    return response.data;
  };

  getModalData = async (formdata: any) => {
    const url =
      sepratorCreaditorBudgetUrl.getModal1Data + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorCreaditorModal1ItemShape[]>
    >(url);
    return response.data;
  };

  getCombo = async () => {
    const url = sepratorCreaditorBudgetUrl.getCombo;
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleSepratorCreaditorComboItemShape[]>
    >(url);
    return response.data;
  };

  connectOne = async (data: any) => {
    const url = sepratorCreaditorBudgetUrl.connectOne;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      data
    );
    return response.data;
  };

  updateOne = async (data: any) => {
    const url = sepratorCreaditorBudgetUrl.updateOne;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      data
    );
    return response.data;
  };

  deleteOne = async (data: any) => {
    const url = sepratorCreaditorBudgetUrl.deleteOne;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      data
    );
    return response.data;
  };
})();
