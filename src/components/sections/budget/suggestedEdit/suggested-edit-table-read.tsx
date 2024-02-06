import {ReactNode, useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {proposalBudgetApi} from "../../../../api/budget/proposal-api";
import {
    GetSingleBeforeProposalItemShape,
    GetSingleSuggestedEditItemShape,
    SuggestedEditModalRead
} from "../../../../types/beforeproposal-type";
import FixedTable from "../../../data/table/fixed-table";
import {TableHeadGroupShape, TableHeadShape} from "../../../../types/table-type";
import {BudgetProposalModalRead} from "../../../../types/data/budget/proposal-type";
import {getPercent, getPercentGrow, sumFieldsInSingleItemData} from "../../../../helper/calculate-utils";
import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import {getGeneralFieldItemArea, getGeneralFieldItemYear} from "../../../../helper/export-utils";
import {proposalBudgetTableReadXlsx} from "../../../../stimul/budget/proposal/budget-proposal-table-read-xlsx";
import {suggestedEditApi} from "../../../../api/budget/suggested-edit-api";
import {beforeproposalConfig} from "../../../../config/features/budget/beforeproposal-config";
import {suggestedEditXlsx} from "../../../../stimul/budget/suggestedEdit/suggested-edit-xlsx";
import {accessNamesConfig} from "../../../../config/access-names-config";

interface SuggestedEditBudgetTableReadProps{
    refresh: number,
    formData: any,
    editButtone: (row: SuggestedEditModalRead) => ReactNode,
    beforeproposalBudgetEdit: any,
    initialData?: GetSingleSuggestedEditItemShape|null;
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

export default function SuggestedEditTableRead({formData, initialData, editButtone, beforeproposalBudgetEdit, refresh, areaId}: SuggestedEditBudgetTableReadProps){
    const [data, setData] = useState<SuggestedEditModalRead[]>([]);
    const [codingId, setCodingId] = useState<number|null>(null);
    const [hasBudgetNext, setHasBudgetNext] = useState<boolean>(false);
    const suggestedEditModalRead = useMutation(suggestedEditApi.suggestedEditModalRead, {
        onSuccess(fetchedData) {
            setData(fetchedData.data.filter(item => !(hasBudgetNext && item.edit === 0)));
        },
    });
    const fetchData = () => {
        if(initialData?.codingId){
            setCodingId(initialData?.codingId);
        }
        suggestedEditModalRead.mutate({...formData, codingId: initialData?.codingId?? codingId});
    }
    
    useEffect(() => {
        fetchData();
    }, [refresh]);
    
    // heads
    const tableHeads: TableHeadShape = [
        {
            title: "ردیف",
            name: "number",
            width: "50px",
        },
        {
            title: "#",
            name: "levelNumber",
            width: "40px",
            hidden:true,
        },
        {
            title: "منطقه",
            name: "areaName",
            width: "110px",
        },
        {
            title: "کد",
            name: "code",
            width: "110px",
        },
        {
            title: "شرح",
            align: "left",
            name: "description",
        },
        {
            title: "مصوب ",
            align: "left",
            name: "mosavab",
            split: true,
            width: "160px",
            canSort: true
        },
        {
            title: "ت اعتبار ",
            name: "supply",
            split: true,
            align: "left",
            hidden: formData[beforeproposalConfig.BUDGET_METHOD] === 1,
            width: "160px",
            canSort: true
        },
        {
            title: "%",
            align: "left",
            name: "percent2",
            width: "60px",
            percent: true
        },
        {
            title: "هزینه ",
            name: "expense",
            align: "left",
            split: true,
            width: "160px",
            canSort: true
        },
        {
            title: "تعهدی 1402",
            align: "left",
            name: "needEditYearNow",
            split: true,
            width: "160px",
            canSort: true
        },
        {
            title: "جمع ت اعتبار تعهدی",
            align: "left",
            name: "sumSupplyNeedEditYearNow",
            split: true,
            width: "160px",
            canSort: true
        },
        {
            title: "اصلاح پیشنهادی",
            align: "left",
            name: "edit",
            split: true,
            width: "160px",
            canSort: true
        },
        {
            title: "% رشد",
            align: "left",
            name: "percentGrow",
            width: "60px",
            percent: true
        },
        {
            title: "% جذب",
            name: "percent",
            percent: true,
            width: "80px",
            hidden:true
        },
        {
            title: "عملیات",
            name: "actions",
            width: "80px",
        },
    ];
    
    const formatTableData = (
        unFormatData: SuggestedEditModalRead[]
    ): TableDataItemShape[] => {
        // @ts-ignore
        const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
            ...item,
            number: i + 1,
            percentGrow: getPercentGrow(item.edit, item.mosavab),
            bgcolor:
                areaId === item.areaId? '#ffb1b1': i % 2 === 0? '#fff' : '#D9F0CB',
            actions: () => editButtone(item),
        }));

        return formatedData;
    };
    
    const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");
    const sumEdit = sumFieldsInSingleItemData(data, "edit");
    const sumNeedEditYearNow = sumFieldsInSingleItemData(data, "needEditYearNow");
    const sumSumSupplyNeedEditYearNow = sumFieldsInSingleItemData(data, "supply");
    const sumfooterSupplyAmount = sumFieldsInSingleItemData(data, "supply");
    const footerExpenseSum = sumFieldsInSingleItemData(data, "expense");
    const tableFooter: TableDataItemShape | any = {
        number: "جمع",
        "colspan-number": 4,
        "rowspan-number": 2,
        areaName: null,
        code: null,
        description: null,
        mosavab: sumMosavab,
        edit: sumEdit,
        needEditYearNow: sumNeedEditYearNow,
        sumSupplyNeedEditYearNow: sumSumSupplyNeedEditYearNow,
        percent2: getPercent(footerExpenseSum, sumMosavab),
        supply: sumfooterSupplyAmount,
        expense: footerExpenseSum,
        percentGrow: getPercentGrow(sumEdit, sumMosavab),
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
        
        suggestedEditXlsx({
            culmnsData: culmnsData,
            area: areaLabel,
            year: yearLabel,
            setExcelLodaing: setExcelLodaing,
            budgetMethod: formData[accessNamesConfig.FIELD_BUDGET_METHOD],
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
                                <Typography variant="body2">دارای اصلاح پیشنهادی</Typography>
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
