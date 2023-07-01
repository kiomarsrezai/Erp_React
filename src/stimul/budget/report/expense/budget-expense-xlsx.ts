import { budgetMethodItems } from "config/features/general-fields-config";
import { globalConfig } from "config/global-config";
import { createStimulsoftFilePath, stimulDateValue } from "helper/export-utils";
import * as XLSX from "xlsx-js-style/dist/xlsx.bundle";

interface StimulOptionsShape {
  year?: string;
  numberShow?: string;
  area?: string;
  culmnsData: any;
  month?: string;
}

export const ListsToExcel = (Sheets: any, filename: string) => {
  var wb = XLSX.utils.book_new();
  wb.Workbook = wb.Workbook || {};
  wb.Workbook.Views = [{ RTL: true }];
  const headerStyle = {
    font: { name: "Dubai", sz: 12, bold: true },
    fill: { fgColor: { rgb: "a9a9a9" } },
    alignment: {
      // wrapText: true,
      horizontal: "right",
    },
  };

  const fitToColumn = (arrayOfArray: any) => {
    const a = arrayOfArray[0].map((a: any, i: any) => ({
      wch: Math.max(
        ...arrayOfArray.map((a2: any) => (a2[i] ? a2[i].toString().length : 0))
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
    const body = sheet.List.map((rowData: any, rowIndex: any) => {
      return sheet.Columns.map((column: any) => {
        const a =
          sheet.Styles.Styles?.[
            sheet.Styles.StylesMap?.[rowIndex + 1]?.[column.Name]
          ] || {};
        const style: any = {};
        style.font = {
          name: "Dubai",
        };
        if (a && a.TextColor) {
          style.font.color = { rgb: a.TextColor.substring(1) };
        }
        style.fill = {};
        if (a && a.BgColor) {
          style.fill.fgColor = { rgb: a.BgColor.substring(1) };
        } else {
          style.fill.fgColor = { rgb: "ffffff" };
        }
        if (!column.Mony) {
          style.alignment = {};
          style.alignment.horizontal = "right";
        }

        return {
          v:
            rowData[column.Name] === null
              ? column.Mony
                ? 0
                : ""
              : rowData[column.Name],
          t: column.Mony ? "n" : "s",
          s: style,
          z: column.Mony ? "#,##0" : undefined,
        };
      });
    });
    const data = header.concat(body);
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

const createData = (data: any, title: string) => {
  return {
    Columns: [
      {
        Header: "کد",
        Name: "code",
      },
      {
        Header: "شرح",
        Name: "description",
      },
      {
        Header: "مصوب",
        Name: "mosavab",
      },
      {
        Header: "اصلاح",
        Name: "edit",
      },
      {
        Header: "ت اعتبار",
        Name: "creditAmount",
      },
      {
        Header: "%",
        Name: "percentCredit",
      },
      {
        Header: "عملکرد",
        Name: "expenseMonth",
      },
      {
        Header: "%",
        Name: "percent",
      },
    ],
    List: data,
    Title: title.replaceAll("/", " "),
    Styles: {
      Styles: {},
      StylesMap: {},
    },
  };
};

export const budgetExpenseXlsx = (exportOptions: StimulOptionsShape) => {
  const data1 = createData(
    exportOptions.culmnsData[1],
    budgetMethodItems[0].label
  );
  const data2 = createData(
    exportOptions.culmnsData[2],
    budgetMethodItems[1].label
  );
  const data3 = createData(
    exportOptions.culmnsData[3],
    budgetMethodItems[2].label
  );
  const data4 = createData(
    exportOptions.culmnsData[4],
    budgetMethodItems[3].label
  );
  const data5 = createData(
    exportOptions.culmnsData[5],
    budgetMethodItems[4].label
  );

  ListsToExcel(
    [data1, data2, data3, data4, data5],
    exportOptions.area as string
  );
};
