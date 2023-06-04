import { budgetProjectOprationConfig } from "config/features/budget/report/budget-project-opration-config";
import {
  budgetKindDeviationItems,
  budgetKindItems,
  budgetMethodItems,
  budgetSortKindItems,
  generalFieldsConfig,
  numbersItems,
  organItems,
} from "config/features/general-fields-config";
import { programProjectConfig } from "config/features/project/program-project-config";
import {
  reactQueryClient,
  reactQueryKeys,
} from "config/react-query-keys-config";

export const stimulDateValue = () => {
  return new Date().toLocaleDateString("fa-IR-u-nu-latn", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
export const createStimulsoftFilePath = (name: string) => {
  return "/Stimulsoft/list/" + name;
};

export const getGeneralFieldItemYear = (formData: any, id: number) => {
  const yearLabel =
    (
      reactQueryClient.getQueryData([
        ...reactQueryKeys.generals.year,
        id,
      ]) as any
    )?.data.find((item: any) => item?.id === formData[generalFieldsConfig.YEAR])
      ?.yearName || "";

  return yearLabel;
};

export const getGeneralFieldItemArea = (formData: any, id: number) => {
  const areaLabel =
    (
      reactQueryClient.getQueryData([
        ...reactQueryKeys.generals.area,
        id,
      ]) as any
    )?.data.find((item: any) => item?.id === formData[generalFieldsConfig.AREA])
      ?.areaName || "";

  return areaLabel;
};

export const getGeneralFieldItemBudgetKind = (formData: any) => {
  return (
    budgetKindItems.find(
      (item) => item.value === formData[generalFieldsConfig.kind]
    )?.label || ""
  );
};

export const getGeneralFieldItemProgram = (formData: any) => {
  const kindLabel =
    (reactQueryClient.getQueryData(["program-list"]) as any)?.data.find(
      (item: any) => item?.id === formData[programProjectConfig.program]
    )?.programName || "";

  return kindLabel;
};

export const getGeneralFieldItemProjectScale = (formData: any) => {
  const kindLabel =
    (reactQueryClient.getQueryData(["project-scale"]) as any)?.data.find(
      (item: any) => item?.id === formData[budgetProjectOprationConfig.scale]
    )?.projectScaleName || "";

  return kindLabel;
};

export const getGeneralFieldItemBudgetKindDeviation = (formData: any) => {
  return (
    budgetKindDeviationItems.find(
      (item) => item.value === formData[generalFieldsConfig.kind]
    )?.label || ""
  );
};

export const getGeneralFieldItemBudgetKindSort = (formData: any) => {
  return (
    budgetSortKindItems.find(
      (item) => item.value === formData[generalFieldsConfig.kind]
    )?.label || ""
  );
};

export const getGeneralFieldItemNumber = (formData: any) => {
  return (
    numbersItems.find(
      (item) => item.value === formData[generalFieldsConfig.numbers]
    )?.label || ""
  );
};

export const getGeneralFieldItemBudgetMethod = (formData: any) => {
  const budgetMethodLabel =
    budgetMethodItems.find(
      (item) => item.value === formData[generalFieldsConfig.BUDGET_METHOD]
    )?.label || "";

  return budgetMethodLabel;
};

export const createImgFromSvg = (selector: string) => {
  var svgElement: any = document.querySelector(selector);

  // Serialize the svg to string
  var svgString = new XMLSerializer().serializeToString(svgElement);

  // Remove any characters outside the Latin1 range
  var decoded = unescape(encodeURIComponent(svgString));

  // Now we can use btoa to convert the svg to base64
  var base64 = btoa(decoded);

  var imgSource = `data:image/svg+xml;base64,${base64}`;
  return imgSource;
};
