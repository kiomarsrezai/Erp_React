import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { GetSingleBudgetDeviationItemShape } from "types/data/budget/budget-deviation-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { requestAnalyzeRead } from "config/features/budget/report/request-analyze-read";
import RequestAnalyzeReadForm from "./request-analyze-read-form";
import FixedTable from "../../../../data/table/fixed-table";

interface TableDataItemShape {
    number: ReactNode;
    projectName: ReactNode;
    projectCode: ReactNode;
    mosavab: ReactNode;
    expense: ReactNode;
}

interface BudgetReportFundingProps {
    tabRender?: ReactNode;
}

export default function RequestAnalyzeRead(props: BudgetReportFundingProps) {
    const { tabRender } = props;
    const [formData, setFormData] = useState({
        [requestAnalyzeRead.area]: undefined,
        [requestAnalyzeRead.kind]: undefined,
    });
    
    const tableHeads: TableHeadShape = [
        {
            title: "ردیف",
            name: "number",
        },
        {
            title: "شماره درخواست",
            name: "requestRefStr",
        },
        {
            title: "تاریخ درخواست",
            name: "requestDate",
        },
        {
            title: "منطقه",
            name: "sectionId",
        },
        {
            title: "شرح درخواست",
            name: "reqDesc",
        },
        {
            title: "مبلغ درخواست",
            name: "requestPrice",
            split: true,
        },
        {
            title: "ثبت هزینه",
            name: "cnfirmedPrice",
            split: true,
        },
        {
            title: "مانده",
            name: "diff",
            split: true,
        },
    ];
    
    // data
    const formatTableData = (
        unFormatData: GetSingleBudgetDeviationItemShape[]
    ): TableDataItemShape[] => {
        const formatedData: TableDataItemShape[] | any = unFormatData.map(
            (item, i) => ({
                ...item,
                number: i + 1,
            })
        );
        
        return formatedData;
    };
    
    const deviationQuery = useQuery(
        reactQueryKeys.budget.projectOpration,
        () => budgetDeviationApi.getData({}),
        {
            enabled: false,
        }
    );
    
    const tableData = formatTableData(deviationQuery.data?.data || []);
    
    // footer
    const requestPrice = sumFieldsInSingleItemData(tableData, "requestPrice");
    const cnfirmedPrice = sumFieldsInSingleItemData(tableData, "cnfirmedPrice");
    const diff = sumFieldsInSingleItemData(tableData, "diff");
    const tableFooter: TableDataItemShape | any = {
        number: "جمع",
        "colspan-number": 5,
        requestRefStr: null,
        sectionId: null,
        requestDate: null,
        reqDesc: null,
        requestPrice: requestPrice,
        cnfirmedPrice: cnfirmedPrice,
        diff: diff,
    };
    
    // head group
    const tableHeadGroups: TableHeadGroupShape = [
        {
            title: (
                <RequestAnalyzeReadForm
                    formData={formData}
                    setFormData={setFormData}
                    tabRender={tabRender}
                    printData={{
                        data: tableData,
                        footer: [tableFooter],
                    }}
                />
            ),
            colspan: 8,
        },
    ];
    
    return (
        <FixedTable
            heads={tableHeads}
            headGroups={tableHeadGroups}
            footer={tableFooter}
            data={tableData}
        />
    );
}
