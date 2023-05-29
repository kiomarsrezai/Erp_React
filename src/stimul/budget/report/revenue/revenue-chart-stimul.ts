import { globalConfig } from "config/global-config";
import { createStimulsoftFilePath, stimulDateValue } from "helper/export-utils";

declare const Stimulsoft: any;

interface StimulOptionsShape {
  year?: string;
  budgetMethod?: string;
  mosavab: any[];
  mosavabDaily: any[];
  area: any[];
  expense: any[];
}

export const revenueChartStimul = (exportOptions: StimulOptionsShape) => {
  // config
  Stimulsoft.Base.StiLicense.key = globalConfig.stimulKey;
  Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(
    "/Stimulsoft/fa.xml",
    true
  );

  const report = Stimulsoft.Report.StiReport.createNewReport();
  report.loadFile(
    createStimulsoftFilePath("proposal/report/revenue/revenue-chart.mrt")
  );

  report.dictionary.databases.clear();

  // data
  const DataSourceList = [
    {
      name: "mosavab",
      data: { data: exportOptions.mosavab },
    },
    {
      name: "area",
      data: { data: exportOptions.area },
    },
    {
      name: "expense",
      data: { data: exportOptions.expense },
    },
    {
      name: "daily",
      data: { data: exportOptions.mosavabDaily },
    },
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
    report.dictionary.variables.getByName("budgetKind").valueObject =
      exportOptions.budgetMethod;
    report.dictionary.variables.getByName("headerDate").valueObject =
      stimulDateValue();

    var svgElement: any = document.querySelector(".recharts-surface");

    // Serialize the svg to string
    var svgString = new XMLSerializer().serializeToString(svgElement);

    // Remove any characters outside the Latin1 range
    var decoded = unescape(encodeURIComponent(svgString));

    // Now we can use btoa to convert the svg to base64
    var base64 = btoa(decoded);

    var imgSource = `data:image/svg+xml;base64,${base64}`;

    report.dictionary.variables.getByName("imgChart").valueObject = imgSource;
  } catch (err) {}

  // virewe
  report.renderAsync(() => {
    report.print();
  });
};
