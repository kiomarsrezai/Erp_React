import { globalConfig } from "config/global-config";
import { createStimulsoftFilePath, stimulDateValue } from "helper/export-utils";

declare const Stimulsoft: any;

interface StimulOptionsShape {
  year?: string;
  numberShow?: string;
  area?: string;
  culmnsData: any;
  month?: string;
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
      data: {
        data1: exportOptions.culmnsData[1],
        data2: exportOptions.culmnsData[2],
        data3: exportOptions.culmnsData[3],
        data4: exportOptions.culmnsData[4],
        data5: exportOptions.culmnsData[5],
      },
    },
  ];

  for (let index = 0; index < DataSourceList.length; index++) {
    var dsdatas = new Stimulsoft.System.Data.DataSet(
      DataSourceList[index].name
    );
    dsdatas.readJson(DataSourceList[index].data);

    report.regData(DataSourceList[index].name, "", dsdatas);
  }

  // varibles
  try {
    report.dictionary.variables.getByName("year").valueObject =
      exportOptions.year;
    report.dictionary.variables.getByName("area").valueObject =
      exportOptions.area;
    report.dictionary.variables.getByName("month").valueObject =
      exportOptions.month;
    report.dictionary.variables.getByName("headerDate").valueObject =
      stimulDateValue();
    report.dictionary.variables.getByName("numberShow").valueObject =
      exportOptions.numberShow;
  } catch (err) {}

  // Export to Excel
  var settings = new Stimulsoft.Report.Export.StiExcelExportSettings();
  // settings.exportDataOnly = false; // خروجی گرفتن از تمام ستون‌ها
  // settings.exportPageBreaks = false; // عدم خروجی گرفتن از صفحه‌بندها
  // settings.exportPictures = true; // خروجی گرفتن از تصاویر
  // settings.exportEachPageToSheet = true; // خروجی گرفتن از یک شیت
  // console.log({ settings });
  settings.exportEachPageToSheet = true; // خروجی گرفتن از یک شیت
  // console.log({ settings });

  // Stimulsoft.StiOptions.Export.Excel.ColumnsRightToLeft = true;
  report.renderAsync(() => {
    report.exportDocumentAsync((pdfdata: any) => {
      try {
        const ByteArrayesh = Stimulsoft.System.Convert.toBase64String(pdfdata);
        saveByteArrayToPdf("title", base64ToArrayBuffer(ByteArrayesh));
        console.log("saved");
      } catch (error) {
        debugger;
      }
    }, Stimulsoft.Report.StiExportFormat.Excel2007);
  });
};

// Export PDF form stimul
const saveByteArrayToPdf = (reportName: any, byte: any) => {
  var blob = new Blob([byte], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
  });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
};

const base64ToArrayBuffer = (base64: any) => {
  var binaryString = window.atob(base64);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};
