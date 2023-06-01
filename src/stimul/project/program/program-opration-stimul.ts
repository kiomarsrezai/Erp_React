import { globalConfig } from "config/global-config";
import { createStimulsoftFilePath, stimulDateValue } from "helper/export-utils";

declare const Stimulsoft: any;

interface StimulOptionsShape {
  area?: string;
  kind?: string;
  data: any[];
  footer: any[];
}

export const programOprationStimul = (exportOptions: StimulOptionsShape) => {
  // config
  Stimulsoft.Base.StiLicense.key = globalConfig.stimulKey;
  Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(
    "/Stimulsoft/fa.xml",
    true
  );

  const report = Stimulsoft.Report.StiReport.createNewReport();
  report.loadFile(
    createStimulsoftFilePath("project/program/program-opration.mrt")
  );

  report.dictionary.databases.clear();

  // data
  const DataSourceList = [
    {
      name: "data",
      data: exportOptions.data,
    },
  ];

  for (let index = 0; index < DataSourceList.length; index++) {
    var dsdatas = new Stimulsoft.System.Data.DataSet();
    dsdatas.readJson(DataSourceList[index].data);

    report.regData(DataSourceList[index].name, "", dsdatas);
  }

  // varibles
  try {
    report.dictionary.variables.getByName("area").valueObject =
      exportOptions.area;
    report.dictionary.variables.getByName("kind").valueObject =
      exportOptions.kind;
    report.dictionary.variables.getByName("headerDate").valueObject =
      stimulDateValue();
  } catch (err) {}

  // virewe
  report.renderAsync(() => {
    report.print();
  });
};
