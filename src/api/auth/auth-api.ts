import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { AUTH_URLS } from "config/features/auth/auth-config";
import { LoginItemShape } from "types/data/auth/login-type";
import { UserItemShape } from "types/data/auth/users-type";

export const AuthApi = new (class extends BaseApi {
  login = async (formdata: any) => {
    const response = await clientAxios.post<
      BaseApiResponseShape<LoginItemShape>
    >(AUTH_URLS.login, formdata);
    return response.data;
  };

  setLicense = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      AUTH_URLS.setLicense,
      formdata
    );
    return response.data;
  };

  changePassword = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      AUTH_URLS.changePassword,
      formdata
    );
    return response.data;
  };

  userByToken = async (token: string) => {
    const response = await clientAxios.post<
      BaseApiResponseShape<LoginItemShape>
    >(AUTH_URLS.userByTocken, { tocken: token });
    return response.data;
  };

  userList = async () => {
    const formData = {
      offset: 0,
      limit: 20,
      order: 1,
      search: "",
    };

    const url = AUTH_URLS.allUsers + this.joinFilterData(formData);
    const response = await clientAxios.get<
      BaseApiResponseShape<UserItemShape[]>
    >(url);
    return response.data;
  };
})();
