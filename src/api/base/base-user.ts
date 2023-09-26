import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { AUTH_URLS } from "config/features/auth/auth-config";
import { LoginItemShape } from "types/data/auth/login-type";
import { UserItemShape } from "types/data/auth/users-type";

export const UserApi = new (class extends BaseApi {
  allUsers = async () => {
    const formData = {
      offset: 0,
      limit: 22,
    };

    const url = AUTH_URLS.allUsers + this.joinFilterData(formData);
    const response = await clientAxios.get<
      BaseApiResponseShape<UserItemShape[]>
    >(url);
    return response.data;
  };

  updateUser = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      "UsersApi/EmployeeUpdate",
      formdata
    );
    return response.data;
  };

  insertUser = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      "UsersApi/EmployeeInsert",
      formdata
    );
    return response.data;
  };
})();
