import {
    sumFieldsInSingleItemData,
} from "helper/calculate-utils";
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
    const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");
    const sumEdit = sumFieldsInSingleItemData(data, "edit");
    const sumSupply = sumFieldsInSingleItemData(data, "supply");
    const sumExpense = sumFieldsInSingleItemData(data, "expense");
    
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
                Header: "مصوب 1402",
                Name: "mosavab",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "اصلاح 1402",
                Name: "edit",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "ت اعتبار 1402",
                Name: "supply",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "هزینه 1402",
                Name: "expense",
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
                edit: sumEdit,
                supply: sumSupply,
                expense: sumExpense,
            },
        ],
        Title: title.replaceAll("/", "-"),
        proccessId,
    };
};

export const budgetProjectScaleModalXlsx = (exportOptions: StimulOptionsShape) => {
    const data = Object.keys(exportOptions.culmnsData).map((item) =>
        createData(
            exportOptions.culmnsData[item],
            exportOptions.area??'data',
            Number(item)
        )
    );
    
    ListsToExcel(
        data,
        `${exportOptions.area} سال ${exportOptions.year}`
    );
    
    enqueueSnackbar(
        `خروجی اکسل برای ${exportOptions.area} با موفقیت انجام شد `,
        {
            variant: "success",
        }
    );
};