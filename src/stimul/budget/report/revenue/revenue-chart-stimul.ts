import { globalConfig } from "config/global-config";
import {
  createImgFromSvg,
  createStimulsoftFilePath,
  stimulDateValue,
} from "helper/export-utils";

declare const Stimulsoft: any;

interface StimulOptionsShape {
  year?: string;
  budgetMethod?: string;
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

  // varibles
  try {
    report.dictionary.variables.getByName("year").valueObject =
      exportOptions.year;
    report.dictionary.variables.getByName("budgetKind").valueObject =
      exportOptions.budgetMethod;
    report.dictionary.variables.getByName("headerDate").valueObject =
      stimulDateValue();

    report.dictionary.variables.getByName("imgChart").valueObject =
      createImgFromSvg(".recharts-surface");
  } catch (err) {}

  // virewe
  report.renderAsync(() => {
    report.print();
  });
};
