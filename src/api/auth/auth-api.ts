import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { AUTH_URLS } from "config/features/auth/auth-config";
import { LoginItemShape } from "types/data/auth/login-type";

export const AuthApi = new (class extends BaseApi {
  login = async (formdata: any) => {
    const response = await clientAxios.post<
      BaseApiResponseShape<LoginItemShape>
    >(AUTH_URLS.login, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };
})();
