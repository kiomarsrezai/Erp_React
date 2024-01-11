import {useEffect, useState} from "react";
import {TableHeadShape} from "../../../../../types/table-type";
import {BudgetProposalModalRead} from "../../../../../types/data/budget/proposal-type";
import FixedTable from "../../../../data/table/fixed-table";

interface TableAmounts {
    year?: string,
    mosavab?: number,
    expense?: number,
    function?: number,
}

export default function ReportRavandBudgetAmounts({data}: {data: any}) {
    const [editedData, setEditedData] = useState<TableAmounts[]>([]);
    
    useEffect(() => {
        let items: TableAmounts[] = []
    
        for (let i = 0; i < data[2].length;i++){
            let item: TableAmounts = {}
            item.year = data[2][i];
            item.mosavab = data[1][i];
            item.expense = data[5][i];
            item.function = data[3][i];
            items.push(item)
        }
    
        setEditedData(items)
    }, [])
    
    function showLog(){
        console.log(editedData)
    }
    
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
    
    return(
        <div>
            <FixedTable
                heads={tableHeads}
                data={tableData}
                notFixed
            />
        </div>
    );
}
