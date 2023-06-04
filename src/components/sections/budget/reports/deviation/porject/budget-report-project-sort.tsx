import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import BudgetReportProjectSortForm from "./budget-report-project-sort-form";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import {
  getPercent,
  getPercentFloat,
  sumFieldsInSingleItemData,
} from "helper/calculate-utils";
import { budgetProjectSortConfig } from "config/features/budget/report/budget-project-sort-config";

interface BudgetReportProjectSortProps {
  tabRender?: ReactNode;
}

function BudgetReportProjectSort(props: BudgetReportProjectSortProps) {
  const { tabRender } = props;

  const [formData, setFormData] = useState({
    [budgetProjectSortConfig.year]: undefined,
    [budgetProjectSortConfig.area]: undefined,
    [budgetProjectSortConfig.kind]: 1,
  });

  // head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "80px",
    },
    {
      title: "کد بودجه",
      name: "code",
      width: "120px",
    },
    {
      title: "شرح ردیف",
      name: "description",
      align: "left",
      width: "600px",
    },

    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "% جذب",
      name: "jazb",
      percent: true,
      width: "80px",
    },
    {
      title: "منطقه",
      name: "areaName",
      width: "100px",
    },
    {
      title: "سهم",
      name: "share",
      width: "100px",
    },
    {
      title: "تجمیع",
      name: "sum",
      width: "100px",
    },
  ];

  // data
  const dataQuery = useQuery(
    reactQueryKeys.budget.sort.getData,
    () => {
      return { data: [] };
    },
    {
      enabled: false,
      initialData: {
        data: [],
      },
    }
  );

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    dataQuery.data?.data || [],
    "mosavab"
  );
  const sumExpense = sumFieldsInSingleItemData(
    dataQuery.data?.data || [],
    "expense"
  );

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    areaName: "",
    jazb: getPercent(sumExpense, sumMosavab),
    description: null,
    mosavab: sumMosavab,
    expense: sumExpense,
  };

  // table data
  let CalculatedMosavab = 0;
  const formatTableData = (unFormatData: any): any => {
    const formatedData: any = unFormatData.map((item: any, i: any) => {
      const result = {
        ...item,
        share: getPercentFloat(item.mosavab, sumMosavab, 1) + "%",
        jazb: getPercent(item.expense, item.mosavab),
        sum:
          getPercentFloat(item.mosavab + CalculatedMosavab, sumMosavab, 1) +
          "%",
        number: i + 1,
      };

      CalculatedMosavab += item.mosavab;
      return result;
    });

    return formatedData;
  };

  const tableData: any = (formatTableData(dataQuery.data?.data) as any) || [];

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetReportProjectSortForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          printData={{
            data: tableData,
            footer: [tableFooter],
          }}
        />
      ),
      colspan: 9,
    },
  ];

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroups}
      footer={tableFooter}
      data={tableData}
      tableLayout="auto"
      enableVirtual
    />
  );
}

export default BudgetReportProjectSort;
