import { budgetProjectOprationConfig } from "config/features/budget/report/budget-project-opration-config";
import { budgetReportExpenseConfig } from "config/features/budget/report/budget-report-expense-config";
import {
  budgetKindDeviationItems,
  budgetKindItems,
  budgetMethodItems,
  budgetSortKindItems,
  generalFieldsConfig,
  monthItems,
  numbersItems,
  organItems,
} from "config/features/general-fields-config";
import { programProjectConfig } from "config/features/project/program-project-config";
import { globalConfig } from "config/global-config";
import {
  reactQueryClient,
  reactQueryKeys,
} from "config/react-query-keys-config";
import { enqueueSnackbar } from "notistack";

export const stimulDateValue = () => {
  return new Date().toLocaleDateString("fa-IR-u-nu-latn", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

export const NowDateValue = () => {
  let nowDate = new Date().toLocaleDateString("fa-IR-u-nu-latn", {
    hour: "numeric",
    minute: "numeric",
  });

  const day = new Date().getDay();
  switch (day) {
    case 0:
      return nowDate + ", یکشنبه ";

    case 1:
      return nowDate + ", دوشنبه ";

    case 2:
      return nowDate + ", سه شنبه ";

    case 3:
      return nowDate + ", چهار شنبه ";

    case 4:
      return nowDate + ", پنج شنبه ";

    case 5:
      return nowDate + ", جمعه ";

    case 6:
      return nowDate + ", شنبه ";
  }

  return;
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

export const getGeneralFieldItemLastYear = (formData: any, id: number) => {
  const year =  getGeneralFieldItemYear(formData, id);
  
  if(year){
    return year - 1;
  }
  
  return '';
};

export const getGeneralFieldItemCurrentYear = (formData: any, id: number) => {
  const year =  getGeneralFieldItemYear(formData, id);
  
  if(year){
    return year;
  }
  
  return '';
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

export const getGeneralFieldItemAreaFromId = (id: number, value: number) => {
  const areaLabel =
    (
      reactQueryClient.getQueryData([
        ...reactQueryKeys.generals.area,
        id,
      ]) as any
    )?.data.find((item: any) => item?.id === value)?.areaName || "";

  return areaLabel;
};

export const getGeneralFieldItemBudgetKind = (formData: any) => {
  return (
    budgetKindItems.find(
      (item) => item.value === formData[generalFieldsConfig.kind]
    )?.label || ""
  );
};

export const getGeneralFieldItemMonth = (formData: any) => {
  return (
    monthItems.find(
      (item) => item.value === formData[budgetReportExpenseConfig.month]
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

export const checkExcelFont = () => {
  const exist = document.fonts.check(
    `16px ${globalConfig.font.excel.checkValue}`
  );
  if (!exist) {
    enqueueSnackbar(globalConfig.font.excel.message, {
      variant: "warning",
    });
  }
};

export const excelHeaderStyle = {
  font: { name: globalConfig.font.excel.value, bold: true, sz: 10 },
  fill: { fgColor: { rgb: "E0E0E0" } },
  alignment: {
    // wrapText: true,
    horizontal: "center",
    vertical: "center",
  },
  border: {
    top: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
    left: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
    bottom: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
    right: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
  },
};

export const excelbodyStyle = (
  rowIndex: number,
  options: {
    textAlign?: "left" | "right" | "center";
    wrapText?: boolean;
  }
) => ({
  font: { name: globalConfig.font.excel.value, sz: 10 },
  fill: { fgColor: { rgb: rowIndex % 2 === 0 ? "ffffff" : "eeeeee" } },
  alignment: {
    wrapText: options.wrapText || false,
    horizontal: options.textAlign || "center",
    vertical: "center",
  },
  border: {
    top: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
    left: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
    bottom: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
    right: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
  },
});

export const excelFooterStyle = {
  font: { name: globalConfig.font.excel.value, sz: 10 },
  fill: { fgColor: { rgb: "e0e0e0" } },
  alignment: {
    // wrapText: true,
    horizontal: "center",
    vertical: "center",
  },
  border: {
    top: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
    left: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
    bottom: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
    right: {
      style: "thin",
      color: { rgb: "bdbdbd" },
    },
  },
};

export const excelFitToColumn = (arrayOfArray: any) => {
  const a = arrayOfArray[0].map((a: any, i: any) => ({
    wch: Math.min(
      Math.max(
        ...arrayOfArray.map((a2: any) => (a2[i].v.toString().length || 0) + 2)
      ),
      80
    ),
  }));
  // debugger
  return a;
};
