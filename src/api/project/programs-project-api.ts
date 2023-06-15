import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  GetSingleProgramDataShape,
  GetSingleProgramListShape,
  GetSingleProgramScaleShape,
} from "types/data/project/program-project-type";
import {
  programProjectConfig,
  programProjectUrls,
} from "config/features/project/program-project-config";

export const programProjectApi = new (class extends BaseApi {
  getProgramList = async () => {
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProgramListShape[]>
    >(programProjectUrls.list);

    return response.data;
  };

  getData = async (formdata: any) => {
    const filterData = {
      [programProjectConfig.area]: formdata[programProjectConfig.area],
      [programProjectConfig.program]: formdata[programProjectConfig.program],
    };

    const url = programProjectUrls.data + this.joinFilterData(filterData);

    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProgramDataShape[]>
    >(url);

    return response.data;
  };

  getScale = async () => {
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProgramScaleShape[]>
    >(programProjectUrls.scale);

    return response.data;
  };

  updateItem = async (formData: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      programProjectUrls.update,
      formData
    );

    return response.data;
  };

  deleteItem = async (formData: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      programProjectUrls.delete,
      formData
    );

    return response.data;
  };
})();
