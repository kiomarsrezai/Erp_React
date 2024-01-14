import {budgetAnalyzeKindItems, budgetMethodItems} from "config/features/general-fields-config";
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
import {GetSingleProgramScaleShape} from "../../../../types/data/project/program-project-type";
const XLSX = require("xlsx-js-style/dist/xlsx.bundle");

interface StimulOptionsShape {
    year?: string;
    numberShow?: string;
    area?: string;
    culmnsData: any;
    month?: string;
    setExcelLodaing: any;
    inputItems: any;
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
                
                // style.fill.fgColor = {
                //     rgb: rgbToHex(
                //         getBgColorBudget(rowData.levelNumber, sheet.proccessId)
                //     ),
                // };
                
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
    const sumSupply = sumFieldsInSingleItemData(data, "supply",);
    const sumExpense = sumFieldsInSingleItemData(data, "expense",);
    const sumBudgetNext = sumFieldsInSingleItemData(data, "budgetNext",);
    
    return {
        Columns: [
            {
                Header: "ردیف",
                Name: "number",
                RowIndex: true,
            },
            {
                Header: "نام منطقه",
                Name: "areaName",
                textAlign: "right",
                wrapText: true,
            },
            {
                Header: "کد پروژه",
                Name: "projectCode",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "نام پروژه",
                textAlign: "right",
                Name: "projectName",
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
            {
                Header: "مبلغ پیشنهادی 1403",
                Name: "budgetNext",
                Mony: true,
                textAlign: "right",
            },
        ],
        List: data,
        Sum: [
            {
                number: "جمع",
                areaName: "",
                projectCode: "",
                projectName: "",
                mosavab: sumMosavab,
                edit: sumEdit,
                supply: sumSupply,
                expense: sumExpense,
                budgetNext: sumBudgetNext,
            },
        ],
        Title: title.replaceAll("/", "-"),
        proccessId,
    };
};

export const budgetProjectScale = (exportOptions: StimulOptionsShape) => {
    const data = Object.keys(exportOptions.culmnsData).map((item) =>
        createData(
            exportOptions.culmnsData[item],
            exportOptions.inputItems.find((budgetItem: any) => String(budgetItem.value) === item)
                ?.label || "",
            Number(item)
        )
    );
    // checkExcelFont();
    
    ListsToExcel(
        data,
        `${exportOptions.area}`
    );
    
    enqueueSnackbar(
        `خروجی اکسل برای ${exportOptions.area} ماه با موفقیت انجام شد `,
        {
            variant: "success",
        }
    );
    
    exportOptions.setExcelLodaing(false);
};
