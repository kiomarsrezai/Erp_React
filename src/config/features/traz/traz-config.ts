import { generalFieldsConfig } from "config/features/general-fields-config";

export const trazConfig = {
  YEAR: generalFieldsConfig.YEAR,
  AREA: generalFieldsConfig.AREA,
  MOEIN: "moienId",
  tafsily: "tafsilyId",
  kind: "kindId",
  markaz_hazine: "markazHazine",
};

export const trazUrls = {
  getData: "TarazApi/GetTaraz",
};
