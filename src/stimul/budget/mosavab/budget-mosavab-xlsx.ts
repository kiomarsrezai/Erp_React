import { budgetMethodItems } from "config/features/general-fields-config";
import {
    getPercentGrow,
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
import {formatExpenseName} from "../../../helper/data-utils";
import {GetSingleProposalItemShape} from "../../../types/data/budget/proposal-type";
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
    data.map((item: any) => {item.percent2 = getPercentGrow(item.edit, item.mosavab);})
    
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
            {
                Header: "% رشد",
                Name: "percent2",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "ت اعتبار",
                Name: "creditAmount",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: formatExpenseName(budgetMethod),
                Name: "expense",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "% جذب",
                Name: "percentBud",
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
                percent2: getPercentGrow(sumEdit, sumMosavab),
                creditAmount: sumCreditAmount,
                percent: "",
            },
        ],
        Title: title.replaceAll("/", "-"),
        proccessId,
    };
};

export const mosavabBudgetXlsx = (exportOptions: StimulOptionsShape) => {
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
