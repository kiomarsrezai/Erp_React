import { globalConfig } from "config/global-config";
import { createStimulsoftFilePath, stimulDateValue } from "helper/export-utils";

declare const Stimulsoft: any;

interface StimulOptionsShape {
  year?: string;
  numberShow?: string;
  area?: string;
  kind?: string;
  data: any[];
  footer: any[];
}

export const budgetExpenseStimul = (exportOptions: StimulOptionsShape) => {
  // config
  Stimulsoft.Base.StiLicense.key = globalConfig.stimulKey;
  Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(
    "/Stimulsoft/fa.xml",
    true
  );

  const report = Stimulsoft.Report.StiReport.createNewReport();
  report.loadFile(
    createStimulsoftFilePath("proposal/report/expense/budget-expense.mrt")
  );

  report.dictionary.databases.clear();
  // data
  const DataSourceList = [
    {
      name: "data",
      data: exportOptions.data,
    },
    // {
    //   name: "footer",
    //   data: exportOptions.footer,
    // },
  ];

  for (let index = 0; index < DataSourceList.length; index++) {
    var dsdatas = new Stimulsoft.System.Data.DataSet();
    dsdatas.readJson(DataSourceList[index].data);

    report.regData(DataSourceList[index].name, "", dsdatas);
  }

  // varibles
  try {
    report.dictionary.variables.getByName("year").valueObject =
      exportOptions.year;
    report.dictionary.variables.getByName("area").valueObject =
      exportOptions.area;
    report.dictionary.variables.getByName("kind").valueObject =
      exportOptions.kind;
    report.dictionary.variables.getByName("headerDate").valueObject =
      stimulDateValue();
    report.dictionary.variables.getByName("numberShow").valueObject =
      exportOptions.numberShow;
  } catch (err) {}

  // virewe
  // report.renderAsync(() => {
  // report.print();
  const options: any = new Stimulsoft.Viewer.StiViewerOptions({
    PageHeight: 12,
    MaximumSheetHeight: 12,
    ExportEachPageToSheet: true,
  });
  console.log({ options });

  const viewer: any = new Stimulsoft.Viewer.StiViewer(
    options,
    "StiViewer",
    false
  );
  viewer.report = report;

  viewer.renderHtml("viewerContent");
  // });
};