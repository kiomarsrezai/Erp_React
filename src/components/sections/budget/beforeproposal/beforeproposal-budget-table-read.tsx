import {ReactNode, useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {proposalBudgetApi} from "../../../../api/budget/proposal-api";
import {GetSingleBeforeProposalItemShape} from "../../../../types/beforeproposal-type";
import FixedTable from "../../../data/table/fixed-table";
import {TableHeadShape} from "../../../../types/table-type";
import {BudgetProposalModalRead} from "../../../../types/data/budget/proposal-type";
import {sumFieldsInSingleItemData} from "../../../../helper/calculate-utils";
import {beforeproposalConfig} from "../../../../config/features/budget/beforeproposal-config";

interface BeforeproposalBudgetTableReadProps{
    refresh: number,
    formData: any,
    editButtone: (row: BudgetProposalModalRead) => ReactNode,
    beforeproposalBudgetEdit: any,
    initialData?: GetSingleBeforeProposalItemShape|null;
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
    budgetNext: number
}

export default function BeforeproposalBudgetTableRead({formData, initialData, editButtone, beforeproposalBudgetEdit, refresh}: BeforeproposalBudgetTableReadProps){
    const [data, setData] = useState<BudgetProposalModalRead[]>([]);
    const budgetProposalModalRead = useMutation(proposalBudgetApi.budgetProposalModalRead, {
        onSuccess(fetchedData) {
            setData(fetchedData.data)
        },
    });
    const fetchData = () => {
        budgetProposalModalRead.mutate({...formData, codingId: initialData?.codingId})
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
            title: "مبلغ پیشنهادی 1403",
            align: "left",
            name: "budgetNext",
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
        actions: "",
    };

    const tableData = formatTableData(data);
    
    return (
        <>
            <FixedTable
                heads={tableHeads}
                data={tableData}
                footer={tableFooter}
                notFixed
            />
            {beforeproposalBudgetEdit}
        </>
    );
}
