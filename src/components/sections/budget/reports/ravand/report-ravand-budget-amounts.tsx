import {useEffect, useState} from "react";
import {TableHeadGroupShape, TableHeadShape} from "../../../../../types/table-type";
import FixedTable from "../../../../data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import {getGeneralFieldItemArea} from "../../../../../helper/export-utils";
import {revenueAmountsExcel} from "../../../../../stimul/budget/report/revenue/revenue-amounts-excel";

interface TableAmounts {
    year?: string,
    mosavab?: number,
    expense?: number,
    function?: number,
    presentMosavab?: number,
}

export default function ReportRavandBudgetAmounts({data, formData}: {data: any,   formData: any}) {
    const [editedData, setEditedData] = useState<TableAmounts[]>([]);
    
    useEffect(() => {
        let items: TableAmounts[] = []
    
        for (let i = 0; i < data[2].length;i++){
            let item: TableAmounts = {}
            item.year = data[2][i];
            item.mosavab = data[1][i];
            item.expense = data[5][i];
            item.function = data[3][i];
            item.presentMosavab = data[4][i];
            items.push(item)
        }
    
        setEditedData(items)
    }, [])
    
    const tableHeads: TableHeadShape = [
        {
            title: "سال",
            name: "year",
            align: "left",
        },
        {
            title: "مصوب",
            align: "left",
            name: "mosavab",
            split: true,
        },
        {
            title: "اصلاح",
            align: "left",
            name: "expense",
            split: true,
        },
        {
            title: "عملکرد",
            align: "left",
            name: "function",
            split: true,
        },
        {
            title: "% به مصوب",
            align: "left",
            name: "presentMosavab",
            percent: true
        },
    ];
    
    const formatTableData = (
        unFormatData: TableAmounts[]
    ): TableAmounts[] => {
        const formatedData: TableAmounts[] = unFormatData.map((item, i) => ({
            ...item,
            number: i + 1,
            bgcolor: i % 2 === 0? '#fff' : '#D9F0CB',
        }));
        
        return formatedData;
    };
    
    const tableData = formatTableData(editedData);
    
    const handleExcelClick = () =>{
        let culmnsData: any = {};

        [{label: 'تست', value: 1}].forEach((item) => {
            culmnsData[item.value] = [];
        });

        const culmnKeys = Object.keys(culmnsData);

        culmnsData = {
            ...culmnsData,
            [1]: tableData,
        };
        const areaLabel = getGeneralFieldItemArea(formData, 3);
    
        revenueAmountsExcel({
            culmnsData: culmnsData,
            area: areaLabel,
        });
    };
    
    const tableHeadGroups: TableHeadGroupShape = [
        {
            title: (
                <div style={{display: 'flex'}}>
                    <IconButton color="primary" onClick={handleExcelClick}>
                        <GetAppIcon />
                    </IconButton>
                </div>
            ),
            colspan: tableHeads.filter((item) => !item.hidden).length,
        },
    ];
    
    return(
        <div>
            <FixedTable
                heads={tableHeads}
                data={tableData}
                headGroups={tableHeadGroups}
                notFixed
            />
        </div>
    );
}
