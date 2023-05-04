import { generalFieldsConfig } from "../general-fields-config";

export const orgPostsConfig = {
  ID: "id",
  parent_ID: "motherId",
  title: "orgName",
  code: "orgCode",
  area: generalFieldsConfig.AREA,
};

export const orgPostsURLS = {
  getList: "OrganizationApi/GetOrganizationList",
  insertItem: "OrganizationApi/OrganizationInsert",
  removeItem: "OrganizationApi/OrganizationDelete",
  updateItem: "OrganizationApi/OrganizationUpdate",
};
