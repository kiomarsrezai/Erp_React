import {ReactNode, useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {proposalBudgetApi} from "../../../../api/budget/proposal-api";
import {GetSingleBeforeProposalItemShape} from "../../../../types/beforeproposal-type";
import FixedTable from "../../../data/table/fixed-table";
import {TableHeadGroupShape, TableHeadShape} from "../../../../types/table-type";
import {BudgetProposalModalRead} from "../../../../types/data/budget/proposal-type";
import {getPercentGrow, sumFieldsInSingleItemData} from "../../../../helper/calculate-utils";
import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import {getGeneralFieldItemArea, getGeneralFieldItemYear} from "../../../../helper/export-utils";
import {generalFieldsConfig} from "../../../../config/features/general-fields-config";
import {proposalBudgetXlsx} from "../../../../stimul/budget/proposal/budget-proposal-xlsx";
import {proposalBudgetTableReadXlsx} from "../../../../stimul/budget/proposal/budget-proposal-table-read-xlsx";

interface BeforeproposalBudgetTableReadProps{
    refresh: number,
    formData: any,
    editButtone: (row: BudgetProposalModalRead) => ReactNode,
    beforeproposalBudgetEdit: any,
    initialData?: GetSingleBeforeProposalItemShape|null;
    areaId?: number|null;
}

interface TableDataItemShape {
    codingId: number,
    areaId: number,
    areaName: string,
    code: string,
    description: string,
    mosavab: number,
    edit: number,
    supply: number,
    expense: number,
    budgetNext: number,
    present2: number,
}

export default function SuggestedEditTableRead({formData, initialData, editButtone, beforeproposalBudgetEdit, refresh, areaId}: BeforeproposalBudgetTableReadProps){
    const [data, setData] = useState<BudgetProposalModalRead[]>([]);
    const [codingId, setCodingId] = useState<number|null>(null);
    const [hasBudgetNext, setHasBudgetNext] = useState<boolean>(false);
    const budgetProposalModalRead = useMutation(proposalBudgetApi.budgetProposalModalRead, {
        onSuccess(fetchedData) {
            setData(fetchedData.data.filter(item => !(hasBudgetNext && item.budgetNext === 0)));
        },
    });
    const fetchData = () => {
        if(initialData?.codingId){
            setCodingId(initialData?.codingId);
        }
        budgetProposalModalRead.mutate({...formData, codingId: initialData?.codingId?? codingId});
    }
    
    useEffect(() => {
        fetchData();
    }, [refresh]);
    
    // heads
    const tableHeads: TableHeadShape = [
        {
            title: "ردیف",
            name: "number",
            width: "30px",
        },
        {
            title: "کد منطقه",
            name: "areaName",
            align: "left",
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
            title: "پیشنهادی 1403",
            align: "left",
            name: "budgetNext",
            split: true,
            width: "130px",
        },
        {
            title: "%",
            align: "left",
            name: "present2",
            percent: true,
            width: "80px",
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
            name: "expense",
            align: "left",
            split: true,
            width: "130px",
        },
        {
            title: "عملیات",
            name: "actions",
            width: "80px",
        },
    ];
    
    const formatTableData = (
        unFormatData: BudgetProposalModalRead[]
    ): TableDataItemShape[] => {
        const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
            ...item,
            number: i + 1,
            bgcolor:
                areaId === item.areaId? '#ffb1b1': i % 2 === 0? '#fff' : '#D9F0CB',
            actions: () => editButtone(item),
        }));

        return formatedData;
    };
    
    const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");
    const sumEdit = sumFieldsInSingleItemData(data, "edit");
    const sumSupply = sumFieldsInSingleItemData(data, "supply");
    const sumExpense = sumFieldsInSingleItemData(data, "expense");
    const sumBudgetNext = sumFieldsInSingleItemData(data, "budgetNext");
    const tableFooter: TableDataItemShape | any = {
        number: "جمع",
        "colspan-number": 4,
        areaName: null,
        code: null,
        description: null,
        mosavab: sumMosavab,
        edit: sumEdit,
        supply: sumSupply,
        expense: sumExpense,
        budgetNext: sumBudgetNext,
        present2: getPercentGrow(sumBudgetNext, sumMosavab),
        actions: "",
    };
    
    const [a, setExcelLodaing] = useState(true)
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
        const areaLabel = getGeneralFieldItemArea(formData, 1);
        proposalBudgetTableReadXlsx({
            culmnsData: culmnsData,
            area: areaLabel,
            year: yearLabel,
            setExcelLodaing: setExcelLodaing,
        });
        
        // const newData = filterData(tableData);
        //
        // culmnsData = {
        //     ...culmnsData,
        //     [item]: newData,
        // };
        //
        // const yearLabel = getGeneralFieldItemYear(formData, 1);
        // const areaLabel = getGeneralFieldItemArea(formData, 1);
    
        // proposalBudgetTableReadXlsx({
        // });
    };

    const tableData = formatTableData(data);
    
    const tableHeadGroups: TableHeadGroupShape = [
        {
            title: (
                <div style={{display: 'flex'}}>
                    <div style={{width: '180px'}}>
                        <FormControlLabel
                            style={{width:'100%'}}
                            control={
                                <Checkbox
                                    checked={hasBudgetNext}
                                    onChange={() => setHasBudgetNext((state: boolean) => !state)}
                                />
                            }
                            label={
                                <Typography variant="body2">دارای بودجه پیشنهادی</Typography>
                            }
                        />
                    </div>
                    <IconButton color="primary" onClick={handleExcelClick}>
                        <GetAppIcon />
                    </IconButton>
                </div>
            ),
            colspan: tableHeads.filter((item) => !item.hidden).length,
        },
    ];
    
    useEffect(() => {
        fetchData();
    },[hasBudgetNext])
    
    return (
        <>
            <FixedTable
                headGroups={tableHeadGroups}
                heads={tableHeads}
                data={tableData}
                footer={tableFooter}
                notFixed
            />
            {beforeproposalBudgetEdit}
        </>
    );
}
