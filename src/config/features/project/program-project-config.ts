import { generalFieldsConfig } from "../general-fields-config";

export const programProjectConfig = {
  area: generalFieldsConfig.AREA,
  program: "programId",
  scale: "scaleId",
};

export const programProjectUrls = {
  list: "ProgramApi/ProgramList",
  data: "ProgramApi/ProgramOperation",
  scale: "ProjectApi/ProjectScaleCom",
  update: "ProgramApi/ProgramOperationUpdate",
  delete: "ProgramApi/ProgramOperationDelete",
};
