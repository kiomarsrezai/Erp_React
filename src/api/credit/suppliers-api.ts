import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  suppliersConfig,
  suppliersUrls,
} from "config/features/credit/suppliers-config";
import {
  SuppliersComboShape,
  SuppliersShape,
} from "types/data/credit/suppliers-type";

export const suppliersApi = new (class extends BaseApi {
  list = async (kind: number) => {
    const formData = {
      [suppliersConfig.kind]: kind,
    };
    const url = suppliersUrls.list + this.joinFilterData(formData);
    const response = await clientAxios.get<
      BaseApiResponseShape<SuppliersShape[]>
    >(url);
    return response.data;
  };

  combo = async () => {
    const response = await clientAxios.get<
      BaseApiResponseShape<SuppliersComboShape[]>
    >(suppliersUrls.combo);
    return response.data;
  };
})();
