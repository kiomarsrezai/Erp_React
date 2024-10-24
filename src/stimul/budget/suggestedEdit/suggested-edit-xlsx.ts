import { budgetMethodItems } from "config/features/general-fields-config";
import { globalConfig } from "config/global-config";
import {
  getPercent, getPercentGrow,
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
import {GetSingleSuggestedEditItemShape} from "../../../types/beforeproposal-type";
import * as XLSX from "xlsx-js-style"

interface StimulOptionsShape {
  year?: string;
  numberShow?: string;
  area?: string;
  culmnsData: any;
  month?: string;
  setExcelLodaing: any;
  budgetMethod: number;
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

const createData = (data: any, title: string, proccessId: number, budgetMethod: number) => {
  const sumMosavab = sumFieldsInSingleItemData(
      data,
      "mosavab",
      (item: any) => item.levelNumber === 1
  );
  const sumSupply = sumFieldsInSingleItemData(
      data,
      "supply",
      (item: any) => item.levelNumber === 1
  );
  const sumEdit = sumFieldsInSingleItemData(
      data,
      "edit",
      (item: any) => item.levelNumber === 1
  );
  const sumCreditAmount = sumFieldsInSingleItemData(
      data,
      "creditAmount",
      (item: any) => item.levelNumber === 1
  );
  const sumBudgetNext = sumFieldsInSingleItemData(
      data,
      "budgetNext",
      (item: any) => item.levelNumber === 1
  );
  const sumExpense = sumFieldsInSingleItemData(
      data,
      "expense",
      (item: any) => item.levelNumber === 1
  );
  const sumNeedEditYearNow = sumFieldsInSingleItemData(
      data,
      "needEditYearNow",
      (item: GetSingleSuggestedEditItemShape) => item.levelNumber === 1
  );
  const sumSumSupplyNeedEditYearNow = sumFieldsInSingleItemData(
      data,
      "sumSupplyNeedEditYearNow",
      (item: GetSingleSuggestedEditItemShape) => item.levelNumber === 1
  );
  
  
  data.map((item: any) => {item.percentGrow = getPercentGrow(item.edit, item.mosavab)})
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
        textAlign: "right",
        wrapText: true,
      },
      {
        Header: "مصوب",
        Name: "mosavab",
        Mony: true,
        textAlign: "right",
      },
      ...(proccessId !== 1
          ? [
            {
              Header: "ت اعتبار",
              Name: "supply",
              Mony: true,
              textAlign: "right",
            },
          ] : []),
  
      {
        Header: "%",
        Name: "percent2",
        textAlign: "right",
        Percent: true,
      },
      {
        Header: "هزینه",
        Name: "expense",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "تعهدی 1402",
        Name: "needEditYearNow",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "جمع ت اعتبار تعهدی",
        Name: "sumSupplyNeedEditYearNow",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "اصلاح پیشنهادی",
        Name: "edit",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "% رشد",
        Name: "percent2",
        Mony: true,
        textAlign: "right",
      },
    ],
    List: data,
    Sum: [
      {
        number: "جمع",
        code: "",
        description: "",
        mosavab: sumMosavab,
        supply: sumSupply,
        percent2: getPercent(sumSupply, sumMosavab),
        edit: sumEdit,
        sumSupplyNeedEditYearNow: sumSumSupplyNeedEditYearNow,
        needEditYearNow: sumNeedEditYearNow,
        percentGrow: getPercentGrow(sumEdit, sumMosavab),
        creditAmount: sumCreditAmount,
        expense: sumExpense,
      },
    ],
    Title: title.replaceAll("/", "-"),
    proccessId,
  };
};

export const suggestedEditXlsx = (exportOptions: StimulOptionsShape) => {
  const data = Object.keys(exportOptions.culmnsData).map((item) =>
      createData(
          exportOptions.culmnsData[item],
          budgetMethodItems.find((budgetItem) => String(budgetItem.value) === item)
              ?.label || "",
          Number(item),
          exportOptions.budgetMethod
      )
  );
  // checkExcelFont();
  
  ListsToExcel(
      data,
      `${exportOptions.area} سال ${exportOptions.year}`
  );
  
  enqueueSnackbar(
      `خروجی اکسل برای ${exportOptions.area} سال ${exportOptions.year} ماه با موفقیت انجام شد `,
      {
        variant: "success",
      }
  );
  
  exportOptions.setExcelLodaing(false);
};
