import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { programURLS } from "config/features/credit/program-config";
import {
  ProgramComboShape,
  ProgramShape,
} from "types/data/credit/program-type";

export const programApi = new (class extends BaseApi {
  list = async (formData: any) => {
    const url = programURLS.list + this.joinFilterData(formData);
    const response = await clientAxios.get<
      BaseApiResponseShape<[ProgramShape]>
    >(url);
    return response.data;
  };

  combo = async () => {
    const response = await clientAxios.get<
      BaseApiResponseShape<ProgramComboShape[]>
    >(programURLS.combo);
    return response.data;
  };
})();
