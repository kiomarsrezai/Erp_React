import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { GetSingleOrgPostItemShape } from "types/orginization/posts-org-type";
import {
  orgPostsConfig,
  orgPostsURLS,
} from "config/features/orginization/posts-config";

export const orgPostsApi = new (class extends BaseApi {
  getPosts = async (area: number) => {
    const url = `${orgPostsURLS.getList}?${orgPostsConfig.area}=${area}`;
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleOrgPostItemShape[]>
    >(url);
    return response.data;
  };

  insertPost = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      orgPostsURLS.insertItem,
      formdata
    );
    return response.data;
  };

  updateProject = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      orgPostsURLS.updateItem,
      formdata
    );
    return response.data;
  };

  deletePost = async (id: number) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      orgPostsURLS.removeItem,
      {
        [orgPostsConfig.ID]: id,
      }
    );
    return response.data;
  };
})();
