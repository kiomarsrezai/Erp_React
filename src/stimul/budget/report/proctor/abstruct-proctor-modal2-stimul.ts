import { globalConfig } from "config/global-config";
import { createStimulsoftFilePath, stimulDateValue } from "helper/export-utils";

declare const Stimulsoft: any;

interface StimulOptionsShape {
  year?: string;
  numberShow?: string;
  title1?: string;
  title2?: string;
  data: any[];
  footer: any[];
}

export const abstructProctorModal2Stimul = (
  exportOptions: StimulOptionsShape
) => {
  // config
  Stimulsoft.Base.StiLicense.key = globalConfig.stimulKey;
  Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(
    "/Stimulsoft/fa.xml",
    true
  );

  const report = Stimulsoft.Report.StiReport.createNewReport();
  report.loadFile(
    createStimulsoftFilePath(
      "proposal/report/proctor/abstruct-proctor-modal2.mrt"
    )
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
    report.dictionary.variables.getByName("title1").valueObject =
      exportOptions.title1;
    report.dictionary.variables.getByName("title2").valueObject =
      exportOptions.title2;
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
