import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import BudgetReportDeviationForm from "./budget-deviation-form";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { GetSingleBudgetDeviationItemShape } from "types/data/budget/budget-deviation-type";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import {convertNumbers} from "../../../../../helper/number-utils";
import {generalFieldsConfig} from "../../../../../config/features/general-fields-config";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  areaname: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
  percmosavab: ReactNode;
}

interface BudgetReportDeviationProps {
  tabRender?: ReactNode;
}

function BudgetReportDeviation(props: BudgetReportDeviationProps) {
  const { tabRender } = props;
  const [formData, setFormData] = useState({
    [budgetDeviationConfig.area]: undefined,
    [budgetDeviationConfig.year]: undefined,
    [budgetDeviationConfig.kind]: 1,
  });

  // head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "منطقه",
      name: "areaName",
      align: "left",
      width: '100px',
    },
    {
      title: "کد",
      name: "code",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "اصلاح",
      name: "edit",
      split: true,
      align: "left",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentCreditAmount",
      percent: true,
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percmosavab",
      percent: true,
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
        "bgcolor-creditAmount": item.creditAmount > item.mosavab && "#d7a2a2",
        "bgcolor-expense": item.expense > item.mosavab && "#d7a2a2",
        "textcolor-expense": item.expense > item.creditAmount && "red",
      })
    );

    return formatedData;
  };

  const deviationQuery = useQuery(
    reactQueryKeys.budget.deviation,
    () => budgetDeviationApi.getData({}),
    {
      enabled: false,
    }
  );

  const data = deviationQuery.data
    ? deviationQuery.data.data.filter((item) => {
        if (formData[budgetDeviationConfig.kind] === 1) {
          return item.percmosavab <= 110;
        } else if (formData[budgetDeviationConfig.kind] === 2) {
          return item.percmosavab > 110;
        } else if (formData[budgetDeviationConfig.kind] === 3) {
          return true;
        }
      })
    : [];
  const tableData = formatTableData(data);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(tableData, "mosavab");
  const sumExpense = sumFieldsInSingleItemData(tableData, "expense");
  const sumCreaditAmount = sumFieldsInSingleItemData(tableData, "creditAmount");
  const sumEdit = sumFieldsInSingleItemData(tableData, "edit");
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    code: null,
    areaName: null,
    description: null,
    mosavab: sumMosavab,
    expense: sumExpense,
    edit: sumEdit,
    creditAmount: sumCreaditAmount,
    percentCreditAmount: getPercent(sumCreaditAmount, sumEdit),
    percmosavab: getPercent(sumExpense, sumMosavab),
  };
  
  
  const formatAndBindData = (data?: any[]) => {
    const formatedData = convertNumbers(
        data||deviationQuery.data?.data||[],
        ["mosavab", "edit", "creditAmount", "expense"],
        // @ts-ignore
        formData[generalFieldsConfig.numbers]
    );
    
    // queryClient.setQueryData(reactQueryKeys.budget.proposal.getData, {
    //   data: formatedData,
    // });
    
    return formatedData
  };
  
  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetReportDeviationForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          formatAndBindData={formatAndBindData}
          printData={{
            data: tableData,
            footer: [tableFooter],
          }}
        />
      ),
      colspan: 16,
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

export default BudgetReportDeviation;
