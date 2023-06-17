import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

interface UploadProps {
  projectId: any;
  formFile: any;
}
export const uploadApi = new (class extends BaseApi {
  upload = async (formValue: UploadProps) => {
    const url = `GeneralApi/UploadFile?projectId=${formValue.projectId}`;

    const formData = new FormData();
    formData.append("formFile", formValue.formFile);

    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formData
    );

    return response.data;
  };
})();
