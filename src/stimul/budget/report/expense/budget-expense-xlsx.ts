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
import * as XLSX from "xlsx-js-style"

interface StimulOptionsShape {
  year?: string;
  numberShow?: string;
  area?: string;
  culmnsData: any;
  month?: string;
  setExcelLodaing?: any;
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

const createData = (data: any, title: string, proccessId: number) => {
  const sumMosavab = sumFieldsInSingleItemData(
    data,
    "mosavab",
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
  const sumExpenseMonth = sumFieldsInSingleItemData(
    data,
    "expenseMonth",
    (item: any) => item.levelNumber === 1
  );
  const percentExpense = getPercent(sumExpenseMonth, sumMosavab);
  const percentCreditAmount = getPercent(sumCreditAmount, sumMosavab);

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
      {
        Header: "اصلاح",
        Name: "edit",
        Mony: true,
        textAlign: "right",
      },
      ...(proccessId !== 1
        ? [
            {
              Header: "ت اعتبار",
              Name: "creditAmount",
              Mony: true,
              textAlign: "right",
            },
            {
              Header: "%",
              Name: "percentCredit",
              Percent: true,
            },
          ]
        : []),
      {
        Header: "عملکرد",
        Name: "expenseMonth",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percent",
        Percent: true,
      },
    ],
    List: data,
    Sum: [
      {
        number: "جمع",
        code: "",
        description: "",
        mosavab: sumMosavab,
        edit: sumEdit,
        creditAmount: sumCreditAmount,
        expenseMonth: sumExpenseMonth,
        percent: percentExpense,
        percentCredit: percentCreditAmount,
      },
    ],
    Title: title.replaceAll("/", "-"),
    proccessId,
  };
};

export const budgetExpenseXlsx = (exportOptions: StimulOptionsShape) => {
  const data = Object.keys(exportOptions.culmnsData).map((item) =>
    createData(
      exportOptions.culmnsData[item],
      budgetMethodItems.find((budgetItem) => String(budgetItem.value) === item)
        ?.label || "",
      Number(item)
    )
  );

  // checkExcelFont();

  ListsToExcel(
    data,
    `${exportOptions.area} سال ${exportOptions.year} ${exportOptions.month} ماه`
  );

  enqueueSnackbar(
    `خروجی اکسل برای ${exportOptions.area} سال ${exportOptions.year} ${exportOptions.month} ماه با موفقیت انجام شد `,
    {
      variant: "success",
    }
  );

  exportOptions.setExcelLodaing(false);
};
