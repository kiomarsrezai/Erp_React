import { budgetMethodItems } from "config/features/general-fields-config";
import { globalConfig } from "config/global-config";
import {
  getPercent,
  numberWithCommas,
  sumFieldsInSingleItemData,
} from "helper/calculate-utils";
import { createStimulsoftFilePath, stimulDateValue } from "helper/export-utils";
import { getBgColorBudget } from "helper/get-color-utils";
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
  const headerStyle = {
    font: { name: globalConfig.font.excel.value, sz: 12, bold: true },
    fill: { fgColor: { rgb: "E0E0E0" } },
    alignment: {
      // wrapText: true,
      horizontal: "right",
    },
  };

  const fitToColumn = (arrayOfArray: any) => {
    const a = arrayOfArray[0].map((a: any, i: any) => ({
      wch:
        20 ||
        Math.max(
          ...arrayOfArray.map((a2: any) =>
            a2[i] ? a2[i].toString().length : 0
          )
        ),
    }));
    // debugger
    return a;
  };

  Sheets.forEach((sheet: any) => {
    const header = [
      [
        ...sheet.Columns.map((column: any) => {
          return {
            v: column.Header,
            t: "s",
            s: headerStyle,
          };
        }),
      ],
    ];

    // body
    const body = sheet.List.map((rowData: any, rowIndex: any) => {
      return sheet.Columns.map((column: any) => {
        const a =
          sheet.Styles.Styles?.[
            sheet.Styles.StylesMap?.[rowIndex + 1]?.[column.Name]
          ] || {};
        const style: any = {};
        style.font = {
          name: globalConfig.font.excel.value,
        };
        if (a && a.TextColor) {
          style.font.color = { rgb: a.TextColor.substring(1) };
        }
        style.fill = {};
        if (a && a.BgColor) {
          style.fill.fgColor = { rgb: a.BgColor.substring(1) };
        } else {
          style.fill.fgColor = {
            rgb: rowIndex % 2 === 0 ? "ffffff" : "eeeeee",
          };
        }
        if (!column.Mony) {
          style.alignment = {};
          style.alignment.horizontal = "right";
          style.alignment.vertical = "center";
        }

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
        const a =
          sheet.Styles.Styles?.[
            sheet.Styles.StylesMap?.[rowIndex + 1]?.[column.Name]
          ] || {};
        const style: any = {};
        style.font = {
          name: globalConfig.font.excel.value,
        };
        if (a && a.TextColor) {
          style.font.color = { rgb: a.TextColor.substring(1) };
        }
        style.fill = {};
        if (a && a.BgColor) {
          style.fill.fgColor = { rgb: a.BgColor.substring(1) };
        } else {
          style.fill.fgColor = {
            rgb: "E0E0E0",
          };
        }
        if (!column.Mony) {
          style.alignment = {};
          style.alignment.horizontal = "right";
          style.alignment.vertical = "center";
        }

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
    ws["!cols"] = fitToColumn(data);
    //var ws = XLSX.utils.json_to_sheet(sheet.data);
    const Title =
      typeof sheet.Title === "function" ? sheet.Title() : sheet.Title;
    XLSX.utils.book_append_sheet(wb, ws, Title);
  });

  XLSX.writeFile(wb, filename + ".xlsx");
};

const createData = (data: any, footer: [any, any, any], title: string) => {
  // const sumMosavab = sumFieldsInSingleItemData(
  //   data,
  //   "mosavab",
  //   (item: any) => item.levelNumber === 1
  // );
  // const sumEdit = sumFieldsInSingleItemData(
  //   data,
  //   "edit",
  //   (item: any) => item.levelNumber === 1
  // );
  // const sumCreditAmount = sumFieldsInSingleItemData(
  //   data,
  //   "creditAmount",
  //   (item: any) => item.levelNumber === 1
  // );
  // const sumExpenseMonth = sumFieldsInSingleItemData(
  //   data,
  //   "expenseMonth",
  //   (item: any) => item.levelNumber === 1
  // );
  // const percentExpense = getPercent(sumExpenseMonth, sumMosavab);
  // const percentCreditAmount = getPercent(sumCreditAmount, sumMosavab);

  return {
    Columns: [
      {
        Header: "ردیف",
        Name: "number",
        RowIndex: true,
        // Width: 90,
      },
      {
        Header: "منطقه",
        Name: "areaName",
        // Width: 90,
      },
      {
        Header: "درآمد",
        Name: "mosavabRevenue",
        Split: true,
        Mony: true,
      },
      {
        Header: "سهم متمرکز",
        Name: "mosavabPayMotomarkez",
        Mony: true,
        // Width: 360,
        Split: true,
      },
      {
        Header: "دریافت از خزانه متمرکز",
        Name: "mosavabDar_Khazane",
        Mony: true,
        // Width: 160,
        Split: true,
      },
      {
        Header: "دریافت از خزانه نیابتی",
        Name: "mosavabNeyabati",
        Mony: true,
        // Width: 160,
        Split: true,
      },
      {
        Header: "جمع منابع",
        Name: "resoures",
        Mony: true,
        // Width: 160,
        Split: true,
      },
      {
        Header: "هزینه ای",
        Name: "mosavabCurrent",
        Split: true,
        Mony: true,
      },
      {
        Header: "%",
        Name: "percent_mosavabCurrent",
        Percent: true,
      },

      {
        Header: "تملک سرمایه ای",
        Name: "mosavabCivil",
        Mony: true,
        // Width: 160,
        Split: true,
      },
      {
        Header: "%",
        Name: "percent_mosavabCivil",
        Percent: true,
      },
      {
        Header: "تملک مالی",
        Name: "mosavabFinancial",
        Mony: true,
        // Width: 160,
        Split: true,
      },
      {
        Header: "%",
        Name: "percent_mosavabFinancial",
        Percent: true,
      },
      {
        Header: "دیون سنواتی",
        Name: "mosavabSanavati",
        Mony: true,
        // Width: 160,
        Split: true,
      },
      {
        Header: "%",
        Name: "percent_mosavabSanavati",
        Percent: true,
      },
      {
        Header: "کنترل موازنه",
        Name: "balanceMosavab",
        Mony: true,
        // Width: 160,
        Split: true,
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

export const abstructBudgetXlsx = (exportOptions: StimulOptionsShape) => {
  const data1 = createData(
    exportOptions.data,
    exportOptions.footer,
    budgetMethodItems[0].label
  );

  ListsToExcel([data1], "خلاصه بودجه");
};
