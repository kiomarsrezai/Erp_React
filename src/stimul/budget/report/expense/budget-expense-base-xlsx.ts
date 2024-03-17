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
  data: any[];
  month?: string;
  footer: [any, any, any];
}

function componentToHex(c: any) {
  var hex = (+c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(color: any) {
  // if (color === "#fff") return "ffffff";
  return "ffffff";

  // const [r, g, b] = color.replace("rgb(", "").split(",");
  // return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const ListsToExcel = (Sheets: any, filename: string) => {
  var wb = XLSX.utils.book_new();
  wb.Workbook = wb.Workbook || {};
  wb.Workbook.Views = [{ RTL: true }];

  const mergeHeader: any = [];

  Sheets.forEach((sheet: any) => {
    // top header
    const topHeader = sheet.TopHeader.map((rowData: any, rowIndex: any) => {
      return sheet.Columns.map((column: any, columnIndex: number) => {
        const TopHeaderItem = rowData.find(
          (item: any) => item.Name === column.Name
        );

        if (TopHeaderItem?.ColSpan > 1 || TopHeaderItem?.RowSpan > 1) {
          const merge = {
            s: { r: rowIndex, c: columnIndex },
            e: {
              r: rowIndex + TopHeaderItem?.RowSpan - 1,
              c: columnIndex + TopHeaderItem?.ColSpan - 1,
            },
          };
          mergeHeader.push(merge);
        }

        return {
          v:
            rowData.find((item: any) => item.Name === column.Name)?.Header ||
            "salam",
          t: "s",
          s: excelHeaderStyle,
        };
      });
    });

    // header
    const header = [
      ...topHeader,
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
    // const merge = [{ s: { r: 0, c: 0 }, e: { r: 1, c: 2 } }];
    ws["!merges"] = mergeHeader;
    //var ws = XLSX.utils.json_to_sheet(sheet.data);
    const Title =
      typeof sheet.Title === "function" ? sheet.Title() : sheet.Title;
    XLSX.utils.book_append_sheet(wb, ws, Title);
  });

  XLSX.writeFile(wb, filename + ".xlsx");
};

const createData = (data: any, footer: [any, any, any], title: string) => {
  return {
    TopHeader: [
      [
        {
          Header: "ردیف",
          Name: "number",
          ColSpan: 1,
          RowSpan: 2,
        },
        {
          Header: "مناطق/سازمانها",
          Name: "areaName",
          ColSpan: 1,
          RowSpan: 2,
        },
        {
          Header: "درآمد",
          Name: "mosavabRevenue",
          ColSpan: 3,
          RowSpan: 1,
        },
        {
          Header: "درآمد",
          Name: "expenseMonthRevenue",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "درآمد",
          Name: "percentRevenue",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "متمرکز",
          Name: "mosavabPayMotomarkez",
          ColSpan: 3,
          RowSpan: 1,
        },
        {
          Header: "متمرکز",
          Name: "expensePayMotomarkez",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "متمرکز",
          Name: "percentPayMotomarkez",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "دریافت از خزانه - از محل متمرکز",
          Name: "mosavabDar_Khazane",
          ColSpan: 3,
          RowSpan: 1,
        },
        {
          Header: "دریافت از خزانه - از محل متمرکز",
          Name: "expenseMonthDarAzKhazane",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "دریافت از خزانه - از محل متمرکز",
          Name: "percentDar_Khazane",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "دریافت از خزانه - از محل نیابتی",
          Name: "mosavabNeyabati",
          ColSpan: 3,
          RowSpan: 1,
        },
        {
          Header: "دریافت از خزانه - از محل نیابتی",
          Name: "expenseMonthNeyabati",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "دریافت از خزانه - از محل نیابتی",
          Name: "percentNeyabati",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "منابع",
          Name: "resoures",
          ColSpan: 1,
          RowSpan: 2,
        },
        {
          Header: "هزینه ای",
          Name: "mosavabCurrent",
          ColSpan: 5,
          RowSpan: 1,
        },
        {
          Header: "هزینه ای",
          Name: "creditCurrent",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "هزینه ای",
          Name: "percentCreditCurrent",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "هزینه ای",
          Name: "expenseMonthCurrent",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "هزینه ای",
          Name: "percentCurrent",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "mosavabCivil",
          ColSpan: 5,
          RowSpan: 1,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "creditAmountCivil",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "percentCreditCivil",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "expenseCivil",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "percentCivil",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "تملک مالی",
          Name: "mosavabFinancial",
          ColSpan: 5,
          RowSpan: 1,
        },
        {
          Header: "تملک مالی",
          Name: "creditFinancial",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "تملک مالی",
          Name: "percentCreditFinancial",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "تملک مالی",
          Name: "expenseFinancial",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "تملک مالی",
          Name: "percentFinancial",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "دیون سنواتی",
          Name: "mosavabSanavati",
          ColSpan: 5,
          RowSpan: 1,
        },
        {
          Header: "دیون سنواتی",
          Name: "creditDoyonSanavati",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "دیون سنواتی",
          Name: "percentDoyonSanavati",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "دیون سنواتی",
          Name: "expenseSanavati",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "دیون سنواتی",
          Name: "percentSanavati",
          ColSpan: 0,
          RowSpan: 1,
        },
        {
          Header: "مانده",
          Name: "balance",
          ColSpan: 1,
          RowSpan: 2,
        },
      ],
    ],
    Columns: [
      {
        Header: "ردیف",
        Name: "number",
        RowIndex: true,
      },
      {
        Header: "مناطق/سازمانها",
        Name: "areaName",
      },
      {
        Header: "مصوب",
        Name: "mosavabRevenue",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "عملکرد",
        Name: "expenseMonthRevenue",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentRevenue",
        Percent: true,
      },
      {
        Header: "مصوب",
        Name: "mosavabPayMotomarkez",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "عملکرد",
        Name: "expensePayMotomarkez",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentPayMotomarkez",
        Percent: true,
      },
      {
        Header: "مصوب",
        Name: "mosavabDar_Khazane",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "عملکرد",
        Name: "expenseMonthDarAzKhazane",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentDar_Khazane",
        Percent: true,
      },
      {
        Header: "مصوب",
        Name: "mosavabNeyabati",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "عملکرد",
        Name: "expenseMonthNeyabati",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentNeyabati",
        Percent: true,
      },
      {
        Header: "منابع",
        Name: "resoures",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "مصوب",
        Name: "mosavabCurrent",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "ت اعتبار",
        Name: "creditCurrent",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentCreditCurrent",
        Percent: true,
      },
      {
        Header: "عملکرد",
        Name: "expenseMonthCurrent",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentCurrent",
        Percent: true,
      },
      {
        Header: "مصوب",
        Name: "mosavabCivil",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "ت اعتبار",
        Name: "creditAmountCivil",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentCreditCivil",
        Percent: true,
      },
      {
        Header: "عملکرد",
        Name: "expenseCivil",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentCivil",
        Percent: true,
      },
      {
        Header: "مصوب",
        Name: "mosavabFinancial",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "ت اعتبار",
        Name: "creditFinancial",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentCreditFinancial",
        Percent: true,
      },
      {
        Header: "عملکرد",
        Name: "expenseFinancial",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentFinancial",
        Percent: true,
      },
      {
        Header: "مصوب",
        Name: "mosavabSanavati",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "ت اعتبار",
        Name: "creditDoyonSanavati",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentDoyonSanavati",
        Percent: true,
      },
      {
        Header: "عملکرد",
        Name: "expenseSanavati",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "%",
        Name: "percentSanavati",
        Percent: true,
      },
      {
        Header: "مانده",
        Name: "balance",
        Mony: true,
        textAlign: "right",
      },
    ],
    List: data,
    Sum: footer,
    Title: title.replaceAll("/", "-"),
    Styles: {
      Styles: {},
      StylesMap: {},
    },
  };
};

export const budgetExpenseBaseXlsx = (exportOptions: StimulOptionsShape) => {
  const data1 = createData(
    exportOptions.data,
    exportOptions.footer,
    "عملکرد ماهیانه"
  );

  // checkExcelFont();

  ListsToExcel(
    [data1],
    `عملکرد ${exportOptions.month} ماه ${exportOptions.year}`
  );
  enqueueSnackbar(
    `خروجی اکسل برای عملکرد ${exportOptions.month} ماه با موفقیت انجام شد `,
    {
      variant: "success",
    }
  );
};
