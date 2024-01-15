import {
    excelFitToColumn,
    excelFooterStyle,
    excelHeaderStyle,
    excelbodyStyle,
} from "helper/export-utils";
import { getBgColorBudget } from "helper/get-color-utils";
import { enqueueSnackbar } from "notistack";
const XLSX = require("xlsx-js-style/dist/xlsx.bundle");

interface StimulOptionsShape {
    year?: string;
    numberShow?: string;
    area?: string;
    culmnsData: any;
    month?: string;
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
    return {
        Columns: [
            {
                Header: "ردیف",
                Name: "year",
                RowIndex: true,
            },
            {
                Header: "مصوب",
                Name: "mosavab",
            },
            {
                Header: "اصلاح",
                Name: "expense",
            },
            
            {
                Header: "عملکرد",
                Name: "function",
                textAlign: "right",
                wrapText: true,
            },
            {
                Header: "% به مصوب",
                Name: "presentMosavab",
                Mony: true,
                textAlign: "right",
            },
        ],
        List: data,
        Sum: [],
        Title: title.replaceAll("/", "-"),
        proccessId,
    };
};

export const revenueAmountsExcel = (exportOptions: StimulOptionsShape) => {
    const data = Object.keys(exportOptions.culmnsData).map((item) =>
        createData(
            exportOptions.culmnsData[item],
            exportOptions.area?? 'sheet',
            Number(item)
        )
    );
    // checkExcelFont();
    
    ListsToExcel(
        data,
        `${exportOptions.area}`
    );
    
    enqueueSnackbar(
        ` خروجی اکسل برای ${exportOptions.area} با موفقیت انجام شد. `,
        {
            variant: "success",
        }
    );
};
