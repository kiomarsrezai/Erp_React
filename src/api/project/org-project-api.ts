import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {
  GetSingleOrgProjectItemShape,
  GetSingleOrgProjectTableItemShape,
} from "types/data/project/org-project-type";
import {
  DELETE_ORG_PROJECT_URL,
  INSERT_ORG_PROJECT_URL,
  ORG_PROJECT_URL,
  UPDATE_ORG_PROJECT_URL,
  orgProjectConfig,
  orgProjectUrls,
} from "config/features/project/org-project-config";

export const orgProjectApi = new (class extends BaseApi {
  getProject = async (formdata: any) => {
    const filterData = {
      [orgProjectConfig.ID]: formdata[orgProjectConfig.ID],
    };

    const url = ORG_PROJECT_URL + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleOrgProjectItemShape[]>
    >(url);
    return response.data;
  };

  addProject = async (formdata: any) => {
    const filterData = {
      [orgProjectConfig.ID]: formdata[orgProjectConfig.ID],
    };

    const url = INSERT_ORG_PROJECT_URL + this.joinFilterData(filterData);
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(url);
    return response.data;
  };

  updateProject = async (formdata: any) => {
    const filterData = {
      [orgProjectConfig.ID]: formdata[orgProjectConfig.ID],
      [orgProjectConfig.title]: formdata[orgProjectConfig.title],
      [orgProjectConfig.code]: formdata[orgProjectConfig.code],
      [orgProjectConfig.parent_ID]: formdata[orgProjectConfig.parent_ID],
    };

    const url = UPDATE_ORG_PROJECT_URL + this.joinFilterData(filterData);
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(url);
    return response.data;
  };

  deleteProject = async (formdata: any) => {
    const filterData = {
      [orgProjectConfig.ID]: formdata[orgProjectConfig.ID],
    };

    const url = DELETE_ORG_PROJECT_URL;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      filterData
    );
    return response.data;
  };

  // table
  getProjectTable = async (formdata: any) => {
    const url = orgProjectUrls.getTable + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleOrgProjectTableItemShape[]>
    >(url);
    return response.data;
  };

  insertProjectTable = async (formdata: any) => {
    const url = orgProjectUrls.insertTable;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );
    return response.data;
  };

  updateProjectTable = async (formdata: any) => {
    const url = orgProjectUrls.updateTable;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );
    return response.data;
  };
})();
