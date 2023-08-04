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

        if (TopHeaderItem?.ColSpan > 1) {
          const merge = {
            s: { r: rowIndex, c: columnIndex },
            e: { r: rowIndex, c: columnIndex + TopHeaderItem?.ColSpan - 1 },
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
        },
        {
          Header: "مناطق/سازمانها",
          Name: "areaName",
          ColSpan: 1,
        },
        {
          Header: "درآمد",
          Name: "mosavabRevenue",
          ColSpan: 3,
        },
        {
          Header: "درآمد",
          Name: "expenseMonthRevenue",
          ColSpan: 0,
        },
        {
          Header: "درآمد",
          Name: "percentRevenue",
          ColSpan: 0,
        },
        {
          Header: "متمرکز",
          Name: "mosavabPayMotomarkez",
          ColSpan: 3,
        },
        {
          Header: "متمرکز",
          Name: "expensePayMotomarkez",
          ColSpan: 0,
        },
        {
          Header: "متمرکز",
          Name: "percentPayMotomarkez",
          ColSpan: 0,
        },
        {
          Header: "	دریافت از خزانه",
          Name: "mosavabDar_Khazane",
          ColSpan: 3,
        },
        {
          Header: "	دریافت از خزانه",
          Name: "expenseMonthDarAzKhazane",
          ColSpan: 0,
        },
        {
          Header: "	دریافت از خزانه",
          Name: "percentDar_Khazane",
          ColSpan: 0,
        },
        {
          Header: "دریافت از خزانه",
          Name: "mosavabNeyabati",
          ColSpan: 3,
        },
        {
          Header: "دریافت از خزانه",
          Name: "expenseMonthNeyabati",
          ColSpan: 0,
        },
        {
          Header: "دریافت از خزانه",
          Name: "percentNeyabati",
          ColSpan: 0,
        },
        {
          Header: "منابع",
          Name: "resoures",
          ColSpan: 1,
        },
        {
          Header: "هزینه ای",
          Name: "mosavabCurrent",
          ColSpan: 5,
        },
        {
          Header: "هزینه ای",
          Name: "creditCurrent",
          ColSpan: 0,
        },
        {
          Header: "هزینه ای",
          Name: "percentCreditCurrent",
          ColSpan: 0,
        },
        {
          Header: "هزینه ای",
          Name: "expenseMonthCurrent",
          ColSpan: 0,
        },
        {
          Header: "هزینه ای",
          Name: "percentCurrent",
          ColSpan: 0,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "mosavabCivil",
          ColSpan: 5,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "creditAmountCivil",
          ColSpan: 0,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "percentCreditCivil",
          ColSpan: 0,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "expenseCivil",
          ColSpan: 0,
        },
        {
          Header: "تملک سرمایه ای	",
          Name: "percentCivil",
          ColSpan: 0,
        },
        {
          Header: "تملک مالی",
          Name: "mosavabFinancial",
          ColSpan: 5,
        },
        {
          Header: "تملک مالی",
          Name: "creditFinancial",
          ColSpan: 0,
        },
        {
          Header: "تملک مالی",
          Name: "percentCreditFinancial",
          ColSpan: 0,
        },
        {
          Header: "تملک مالی",
          Name: "expenseFinancial",
          ColSpan: 0,
        },
        {
          Header: "تملک مالی",
          Name: "percentFinancial",
          ColSpan: 0,
        },
        {
          Header: "دیون سنواتی",
          Name: "mosavabSanavati",
          ColSpan: 5,
        },
        {
          Header: "دیون سنواتی",
          Name: "creditDoyonSanavati",
          ColSpan: 0,
        },
        {
          Header: "دیون سنواتی",
          Name: "percentDoyonSanavati",
          ColSpan: 0,
        },
        {
          Header: "دیون سنواتی",
          Name: "expenseSanavati",
          ColSpan: 0,
        },
        {
          Header: "دیون سنواتی",
          Name: "percentSanavati",
          ColSpan: 0,
        },
        {
          Header: "مانده",
          Name: "balance",
          ColSpan: 1,
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
        Header: "درآمد - مصوب",
        Name: "mosavabRevenue",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "درآمد - عملکرد",
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
        Header: "متمرکز - مصوب",
        Name: "mosavabPayMotomarkez",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "متمرکز - عملکرد",
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
        Header: "دریافت از خزانه - از محل متمرکز - مصوب",
        Name: "mosavabDar_Khazane",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "دریافت از خزانه - از محل متمرکز - عملکرد",
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
        Header: "دریافت از خزانه - از محل نیابتی - مصوب",
        Name: "mosavabNeyabati",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "دریافت از خزانه - از محل نیابتی - عملکرد",
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
        Header: "هزینه ای - مصوب",
        Name: "mosavabCurrent",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "هزینه ای - ت اعتبار",
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
        Header: "هزینه ای - عملکرد",
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
        Header: "تملک سرمایه ای - مصوب",
        Name: "mosavabCivil",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "تملک سرمایه ای - ت اعتبار",
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
        Header: "تملک سرمایه ای - عملکرد",
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
        Header: "تملک مالی - مصوب",
        Name: "mosavabFinancial",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "تملک مالی - ت اعتبار",
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
        Header: "تملک مالی - عملکرد",
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
        Header: "دیون سنواتی - مصوب",
        Name: "mosavabSanavati",
        Mony: true,
        textAlign: "right",
      },
      {
        Header: "دیون سنواتی - ت اعتبار",
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
        Header: "دیون سنواتی - عملکرد",
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

  ListsToExcel([data1], `عملکرد ${exportOptions.month} ماه`);
  enqueueSnackbar(
    `خروجی اکسل برای عملکرد ${exportOptions.month} ماه با موفقیت انجام شد `,
    {
      variant: "success",
    }
  );
};
