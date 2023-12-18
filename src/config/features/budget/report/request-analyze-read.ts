import { generalFieldsConfig } from "config/features/general-fields-config";

export const requestAnalyzeRead = {
    kind: generalFieldsConfig.kind,
    area: generalFieldsConfig.AREA,
};

export const requestAnalyzeReadUrls = {
    getData: "ReportApi/RequestAnalyzeRead",
};
