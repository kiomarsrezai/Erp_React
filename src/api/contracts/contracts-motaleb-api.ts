import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { contractsPlacesUrls } from "config/features/contracts/conreacts-places-config";
import {
  GetSingleContractLeftDataItemShape,
  GetSingleContractLeftModalDataItemShape,
  GetSingleContractMotalebItemShape,
} from "types/data/contracts/contracts-motaleb-type";
import {
  contractsMotalebConfig,
  contractsMotalebUrls,
} from "config/features/contracts/conreacts-motaleb-config";

export const contractsMotalebApi = new (class extends BaseApi {
  // right
  getData = async (formData: any) => {
    const url = contractsMotalebUrls.getData + this.joinFilterData(formData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractMotalebItemShape[]>
    >(url);
    return response.data;
  };

  // left
  getLeftData = async (formData: any) => {
    const url =
      contractsMotalebUrls.getLeftData + this.joinFilterData(formData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractLeftDataItemShape[]>
    >(url);
    return response.data;
  };

  readModalItem = async (formData: any) => {
    const url =
      contractsMotalebUrls.getLeftModalItem + this.joinFilterData(formData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleContractLeftModalDataItemShape[]>
    >(url);
    return response.data;
  };

  insertModalItem = async (formData: any) => {
    const url = contractsMotalebUrls.insertLeftModalItem;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formData
    );
    return response.data;
  };
})();
