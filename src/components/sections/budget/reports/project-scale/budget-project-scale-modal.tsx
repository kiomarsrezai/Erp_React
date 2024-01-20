import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import {budgetDeviationApi} from "../../../../../api/report/budget-deviation-api";
import {
    BudgetProjectScaleModalItemShape,
    GetSingleBudgetDeviationItemShape
} from "../../../../../types/data/budget/budget-deviation-type";
import FixedTable from "../../../../data/table/fixed-table";
import {TableHeadGroupShape, TableHeadShape} from "../../../../../types/table-type";
import {sumFieldsInSingleItemData} from "../../../../../helper/calculate-utils";
import {getGeneralFieldItemProjectScale, getGeneralFieldItemYear} from "helper/export-utils";
import {
    budgetProjectScaleModalXlsx
} from "../../../../../stimul/budget/report/project-scale/budget-project-scale-modal-xlsx";

interface BudgetProjectScaleModalProps{
    formData: any,
    initialData: GetSingleBudgetDeviationItemShape;
}

interface TableDataItemShape {
    code: string;
    description: string;
    edit: number;
    expense: number;
    mosavab: number;
    supply: number;
}

export default function BudgetProjectScaleModal({formData, initialData}: BudgetProjectScaleModalProps){
    const [data, setData] = useState<BudgetProjectScaleModalItemShape[]>([]);
   
    const budgetProposalModalRead = useMutation(budgetDeviationApi.projectReportScaleBudgetModal, {
        onSuccess(data) {
            setData(data.data)
        },
    });
    
    const tableHeads: TableHeadShape = [
        {
            title: "ردیف",
            name: "number",
            width: "30px",
        },
        {
            title: "کد",
            name: "code",
            align: "left",
            width: "70px",
        },
        {
            title: "شرح",
            name: "description",
            align: "left",
            width: "300px",
        },
        {
            title: "مصوب 1402",
            align: "left",
            name: "mosavab",
            split: true,
            width: "130px",
        },
        {
            title: "اصلاح 1402",
            align: "left",
            name: "edit",
            split: true,
            width: "130px",
        },
        {
            title: "ت اعتبار 1402",
            align: "left",
            name: "supply",
            split: true,
            width: "130px",
        },
        {
            title: "هزینه 1402",
            align: "left",
            name: "expense",
            split: true,
            width: "130px",
        },
    ];
    
    const fetchData = () => {
        budgetProposalModalRead.mutate({...formData, areaId: initialData.areaId});
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const formatTableData = (
        unFormatData: BudgetProjectScaleModalItemShape[]
    ): TableDataItemShape[] => {
        const formatedData: BudgetProjectScaleModalItemShape[] = unFormatData.map((item, i) => ({
            ...item,
            number: i + 1,
            bgcolor: i % 2 === 0? '#fff' : '#D9F0CB',
        }));
        
        return formatedData;
    };
    
    const tableData = formatTableData(data);
    
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
    
        const yearLabel = getGeneralFieldItemYear(formData, 1);
        const projectScale = getGeneralFieldItemProjectScale(formData);
        budgetProjectScaleModalXlsx({
            culmnsData: culmnsData,
            area: projectScale,
            year: yearLabel,
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
    
    const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");
    const sumEdit = sumFieldsInSingleItemData(data, "edit");
    const sumSupply = sumFieldsInSingleItemData(data, "supply");
    const sumExpense = sumFieldsInSingleItemData(data, "expense");
    const tableFooter: TableDataItemShape | any = {
        number: "جمع",
        code: null,
        description: null,
        "colspan-number": 3,
        mosavab: sumMosavab,
        edit: sumEdit,
        supply: sumSupply,
        expense: sumExpense,
    };
    
    return (
        <FixedTable
            headGroups={tableHeadGroups}
            heads={tableHeads}
            data={tableData}
            footer={tableFooter}
            notFixed
        />
    );
}
