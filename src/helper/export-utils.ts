import {
  budgetKindItems,
  budgetMethodItems,
  generalFieldsConfig,
  numbersItems,
  organItems,
} from "config/features/general-fields-config";
import { reactQueryKeys } from "config/react-query-keys-config";

declare const Stimulsoft: any;

interface StimulOptionsShape {
  file: string;
  header?: string;
  justExport?: "print";
  headerDescription?: string;
}

const key =
  "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";

export const stimulExport = (
  data: any[],
  footer: any[],
  exportOptions: StimulOptionsShape
) => {
  // config
  Stimulsoft.Base.StiLicense.key = key;
  Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(
    "/Stimulsoft/fa.xml",
    true
  );
  const report = Stimulsoft.Report.StiReport.createNewReport();
  report.loadFile(createStimulsoftFilePath(exportOptions.file));

  report.dictionary.databases.clear();

  // data
  const DataSourceList = [
    {
      name: "budget",
      data,
    },
    {
      name: "footer",
      data: footer,
    },
  ];

  for (let index = 0; index < DataSourceList.length; index++) {
    var dsdatas = new Stimulsoft.System.Data.DataSet();
    dsdatas.readJson(DataSourceList[index].data);

    report.regData(DataSourceList[index].name, "", dsdatas);
  }

  // varibles
  if (exportOptions.headerDescription) {
    report.dictionary.variables.getByName("headerDescription").valueObject =
      exportOptions.headerDescription;
  }

  if (exportOptions.header) {
    report.dictionary.variables.getByName("header").valueObject =
      exportOptions.header;
  }

  report.dictionary.variables.getByName("headerDate").valueObject =
    new Date().toLocaleDateString("fa-IR-u-nu-latn", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

  // virewe
  if (exportOptions.justExport === "print") {
    report.renderAsync(() => {
      report.print();
    });
  } else {
    const options: any = new Stimulsoft.Viewer.StiViewerOptions({});
    const viewer: any = new Stimulsoft.Viewer.StiViewer(
      options,
      "StiViewer",
      false
    );
    viewer.report = report;
    viewer.renderHtml("viewerContent");
  }
};

const createStimulsoftFilePath = (name: string) => {
  return "/Stimulsoft/list/" + name;
};

export const getGeneralFieldItem = (
  queryClient: any,
  formData: any,
  fields: [string, number?][]
) => {
  let result = "";

  fields.forEach((field) => {
    // year
    if (field[0] === generalFieldsConfig.YEAR) {
      const yearLabel = (
        queryClient.getQueryData([
          ...reactQueryKeys.generals.year,
          field[1],
        ]) as any
      )?.data.find(
        (item: any) => item?.id === formData[generalFieldsConfig.YEAR]
      );

      result = `${result} - سال ${yearLabel.yearName}`;
    }

    // budget method
    if (field[0] === generalFieldsConfig.BUDGET_METHOD) {
      const budgetMethodLabel =
        budgetMethodItems.find(
          (item) => item.value === formData[generalFieldsConfig.BUDGET_METHOD]
        )?.label || "";

      result = `${result} - ${budgetMethodLabel}`;
    }

    // numbers
    if (field[0] === generalFieldsConfig.numbers) {
      const numbersLabel =
        numbersItems.find(
          (item) => item.value === formData[generalFieldsConfig.numbers]
        )?.label || "";

      result = `${result} - مرتبه اعداد ${numbersLabel} میباشد`;
    }

    // kind method
    if (field[0] === generalFieldsConfig.kind) {
      const budgetKindLabel =
        budgetKindItems.find(
          (item) => item.value === formData[generalFieldsConfig.kind]
        )?.label || "";

      result = `${result} - ${budgetKindLabel}`;
    }

    // organ
    if (field[0] === generalFieldsConfig.ORGAN) {
      const organLabel =
        organItems.find(
          (item) => item.value === formData[generalFieldsConfig.ORGAN]
        )?.label || "";

      result = `${result} - ${organLabel}`;
    }

    // area
    if (field[0] === generalFieldsConfig.AREA) {
      const areaLabel = (
        queryClient.getQueryData([
          ...reactQueryKeys.generals.area,
          field[1],
        ]) as any
      )?.data.find(
        (item: any) => item.id === formData[generalFieldsConfig.AREA]
      );

      result = `${result} - ${areaLabel.areaName}`;
    }
  });

  return result.slice(2);
};
