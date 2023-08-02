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
        Name: "expenseRevenue",
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
        Name: "expenseDar_Khazane",
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
        Name: "expenseNeyabati",
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
        Header: "هزینه ای - عملکرد",
        Name: "expenseCurrent",
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
    budgetMethodItems[0].label
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
