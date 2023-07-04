import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import { contractsTasksUrls } from "config/features/contracts/conreacts-tasks-config";
import { GetSingleContractTaskItemShape } from "types/data/contracts/contracts-tasks-type";
import {
  GetSingleDepartmanAcceptorComboShape,
  GetSingleDepartmanAcceptorItemShape,
} from "types/data/departman/departman-acceptor-type";
import { departmanAcceptorUrls } from "config/features/departman/departman-acceptor-config";

export const departmanAcceptorApi = new (class extends BaseApi {
  getData = async () => {
    const url = departmanAcceptorUrls.getData;
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleDepartmanAcceptorItemShape[]>
    >(url);
    return response.data;
  };

  getCombo = async () => {
    const url = departmanAcceptorUrls.getCombo;
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleDepartmanAcceptorComboShape[]>
    >(url);
    return response.data;
  };
})();
