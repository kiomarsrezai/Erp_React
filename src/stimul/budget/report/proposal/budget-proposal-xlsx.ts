import { budgetMethodItems } from "config/features/general-fields-config";
import { globalConfig } from "config/global-config";
import {
  getPercent,
  numberWithCommas,
  sumFieldsInSingleItemData,
} from "helper/calculate-utils";
import {
  checkExcelFont,
  createStimulsoftFilePath,
  excelFitToColumn,
  excelFooterStyle,
  excelHeaderStyle,
  excelbodyStyle,
  stimulDateValue,
} from "helper/export-utils";
import { getBgColorBudget } from "helper/get-color-utils";
import { enqueueSnackbar } from "notistack";
const XLSX = require("xlsx-js-style/dist/xlsx.bundle");

interface StimulOptionsShape {
  year?: string;
  numberShow?: string;
  area?: string;
  data: any[];
  month?: string;
  footer: [any, any, any];
}

function componentToHex(c: any) {
  var hex = (+c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(color: any) {
  if (color === "#fff") return "ffffff";
  
  const [r, g, b] = color.replace("rgb(", "").split(",");
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const ListsToExcel = (Sheets: any, filename: string) => {
  var wb = XLSX.utils.book_new();
  wb.Workbook = wb.Workbook || {};
  wb.Workbook.Views = [{ RTL: true }];
  
  Sheets.forEach((sheet: any) => {
    const header = [
      [
        ...sheet.Columns.map((column: any) => {
          return {
            v: column.Header,
            t: "s",
            s: excelHeaderStyle,
          };
        }),
      ],
    ];
    
    // body
    const body = sheet.List.map((rowData: any, rowIndex: any) => {
      return sheet.Columns.map((column: any) => {
        const style: any = excelbodyStyle(rowIndex, {
          textAlign: column.textAlign,
          wrapText: column.wrapText,
        });
  
        style.fill.fgColor = {
          rgb: rgbToHex(
            getBgColorBudget(rowData.levelNumber, sheet.proccessId)
          ),
        };
  
  
        style.fill.fgColor = {
          rgb: rgbToHex(
              getBgColorBudget(rowData.levelNumber, 3)
          ),
        };
        
        return {
          v:
              rowData[column.Name] === null || rowData[column.Name] === undefined
                  ? column.Mony
                      ? 0
                      : column.RowIndex
                          ? rowIndex + 1
                          : ""
                  : column.Percent
                      ? `${rowData[column.Name]} %`
                      : rowData[column.Name],
          t: column.Mony ? "n" : "s",
          s: style,
          z: column.Mony ? "#,##0" : undefined,
        };
      });
    });
    
    // footer
    const footer = sheet.Sum.map((rowData: any, rowIndex: any) => {
      return sheet.Columns.map((column: any) => {
        const style: any = excelFooterStyle;
        
        return {
          v:
              rowData[column.Name] === null || rowData[column.Name] === undefined
                  ? column.Mony
                      ? 0
                      : ""
                  : column.Percent
                      ? `${rowData[column.Name]} %`
                      : rowData[column.Name],
          t: column.Mony ? "n" : "s",
          s: style,
          z: column.Mony ? "#,##0" : undefined,
        };
      });
    });
    
    const data = header.concat(...[body, footer]);
    
    //debugger
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = excelFitToColumn(data);
    //var ws = XLSX.utils.json_to_sheet(sheet.data);
    const Title =
        typeof sheet.Title === "function" ? sheet.Title() : sheet.Title;
    XLSX.utils.book_append_sheet(wb, ws, Title);
  });
  
  XLSX.writeFile(wb, filename + ".xlsx");
};

const createData = (data: any, footer: [any, any, any], title: string) => {
  return {
    Columns: [
      {
        Header: "ردیف",
        Name: "number",
        RowIndex: true,
      },
      {
        Header: "کد",
        Name: "code",
      },
      {
        Header: "شرح",
        Name: "description",
      },
      {
        Header: "مصوب 1402",
        Name: "mosavab",
      },
      {
        Header: "اصلاح 1402",
        Name: "edit",
      },
      {
        Header: "مبلغ پیشنهادی 1403",
        Name: "budgetNext",
      },
      {
        Header: "ت اعتبار 1402",
        Name: "creditAmount",
      },
      {
        Header: "هزینه 1402",
        Name: "expense",
      },
    ],
    List: data,
    Sum: [],
    Title: title.replaceAll("/", "-"),
    Styles: {
      Styles: {},
      StylesMap: {},
    },
  };
};

export const proposalBudgetXlsx = (exportOptions: StimulOptionsShape) => {
  const data1 = createData(
      exportOptions.data,
      exportOptions.footer,
      budgetMethodItems[0].label
  );
  
  checkExcelFont();
  
  ListsToExcel([data1], "بودجه پیشنهادی");
  enqueueSnackbar(`خروجی اکسل برای بودجه پیشنهادی انجام شد `, {
    variant: "success",
  });
};
