import { globalConfig } from "config/global-config";
import { createStimulsoftFilePath, stimulDateValue } from "helper/export-utils";

declare const Stimulsoft: any;

interface StimulOptionsShape {
  year?: string;
  numberShow?: string;
  data: any[];
  footer: any[];
}

export const abstructProctorStimul = (exportOptions: StimulOptionsShape) => {
  // config
  Stimulsoft.Base.StiLicense.key = globalConfig.stimulKey;
  Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(
    "/Stimulsoft/fa.xml",
    true
  );

  const report = Stimulsoft.Report.StiReport.createNewReport();
  report.loadFile(
    createStimulsoftFilePath("proposal/report/proctor/abstruct-proctor.mrt")
  );

  report.dictionary.databases.clear();

  // data
  const DataSourceList = [
    {
      name: "data",
      data: exportOptions.data,
    },
    {
      name: "footer",
      data: exportOptions.footer,
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
    report.dictionary.variables.getByName("headerDate").valueObject =
      stimulDateValue();
    report.dictionary.variables.getByName("numberShow").valueObject =
      exportOptions.numberShow;
  } catch (err) {}

  // virewe
  report.renderAsync(() => {
    report.print();
  });
};
