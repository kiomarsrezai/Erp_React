import { globalConfig } from "config/global-config";
import { createStimulsoftFilePath, stimulDateValue } from "helper/export-utils";

declare const Stimulsoft: any;

interface StimulOptionsShape {
  year?: string;
  number?: string;
  budgetKind?: string;
  data: any[];
  footer: any;
}

export const revenueModalDetailStimul = (exportOptions: StimulOptionsShape) => {
  // config
  Stimulsoft.Base.StiLicense.key = globalConfig.stimulKey;
  Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(
    "/Stimulsoft/fa.xml",
    true
  );

  const report = Stimulsoft.Report.StiReport.createNewReport();
  report.loadFile(
    createStimulsoftFilePath("proposal/report/revenue/revenue-modal-detail.mrt")
  );

  report.dictionary.databases.clear();

  // data
  const DataSourceList = [
    {
      name: "revenue",
      data: exportOptions.data,
    },
    {
      name: "footer",
      data: [exportOptions.footer],
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
      exportOptions.budgetKind;

    report.dictionary.variables.getByName("numberShow").valueObject =
      exportOptions.number;

    report.dictionary.variables.getByName("headerDate").valueObject =
      stimulDateValue();
  } catch (err) {}

  // virewe
  report.renderAsync(() => {
    report.print();
  });
};
