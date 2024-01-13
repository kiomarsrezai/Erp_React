import {useEffect, useState} from "react";
import {TableHeadShape} from "../../../../types/table-type";
import FixedTable from "../../../data/table/fixed-table";

interface TableAmounts {
    year?: string,
    mosavab?: number,
    presentMosavab?: number,
    function?: number,
}

export default function BeforeproposalBudgetAmountsTable({data}: {data: any}) {
    const [editedData, setEditedData] = useState<TableAmounts[]>([]);
    
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
            title: "عملکرد",
            align: "left",
            name: "function",
            split: true,
        },
        {
            title: "%",
            align: "left",
            name: "presentMosavab",
            split: true,
        },
    ];
    
    useEffect(() => {
        let items: TableAmounts[] = []
        
        for (let i = 0; i < data[2].length;i++){
            let item: TableAmounts = {}
            item.year = data[0][i];
            item.mosavab = data[1][i];
            item.function = data[3][i];
            item.presentMosavab = data[4][i];
            items.push(item)
        }
        
        setEditedData(items)
    }, [])
    
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
        <FixedTable
            heads={tableHeads}
            data={tableData}
            notFixed
        />
    );
}
