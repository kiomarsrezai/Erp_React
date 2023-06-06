import { generalFieldsConfig } from "../general-fields-config";

export const orgPostsConfig = {
  ID: "id",
  parent_ID: "motherId",
  title: "departmentName",
  code: "departmentCode",
  area: generalFieldsConfig.AREA,
};

export const orgPostsURLS = {
  getList: "OrganizationApi/DepartmentRead",
  insertItem: "OrganizationApi/DepartmentInsert",
  removeItem: "OrganizationApi/DepartmentDelete",
  updateItem: "OrganizationApi/DepartmentUpdate",
};
