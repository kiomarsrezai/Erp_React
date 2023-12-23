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
const XLSX = require("xlsx-js-style/dist/xlsx.bundle");

interface StimulOptionsShape {
    year?: string;
    numberShow?: string;
    area?: string;
    culmnsData: any;
    month?: string;
    setExcelLodaing: any;
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
    const sumRequestPrice = sumFieldsInSingleItemData(data, "requestPrice");
    const sumCnfirmedPrice = sumFieldsInSingleItemData(data, "cnfirmedPrice");
    const sumDiff = sumFieldsInSingleItemData(data, "diff",);
    
    return {
        Columns: [
            {
                Header: "ردیف",
                Name: "number",
                RowIndex: true,
            },
            {
                Header: "ش درخواست",
                Name: "requestRefStr",
                textAlign: "right",
                wrapText: true,
            },
            {
                Header: "تاریخ درخواست",
                Name: "requestDate",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "ش ت اعتبار",
                textAlign: "right",
                Name: "confirmDocNo",
            },
            {
                Header: "تاریخ ت اعتبار",
                Name: "confirmDocDate",
                textAlign: "right",
            },
            {
                Header: "منطقه",
                Name: "sectionId",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "شرح درخواست",
                Name: "reqDesc",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "مبلغ درخواست",
                Name: "requestPrice",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "ثبت هزینه",
                Name: "cnfirmedPrice",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "مانده",
                Name: "diff",
                Mony: true,
                textAlign: "right",
            },
            {
                Header: "روز",
                Name: "day",
                Mony: true,
                textAlign: "right",
            },
        ],
        List: data,
        Sum: [
            {
                number: "جمع",
                confirmDocNo: "",
                requestRefStr: "",
                requestDate: "",
                sectionId: "",
                reqDesc: "",
                requestPrice: sumRequestPrice,
                cnfirmedPrice: sumCnfirmedPrice,
                diff: sumDiff,
            },
        ],
        Title: title.replaceAll("/", "-"),
        proccessId,
    };
};

export const requestAnalyzeBudgetXlsx = (exportOptions: StimulOptionsShape) => {
    const data = Object.keys(exportOptions.culmnsData).map((item) =>
        createData(
            exportOptions.culmnsData[item],
            budgetAnalyzeKindItems.find((budgetItem) => String(budgetItem.value) === item)
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
