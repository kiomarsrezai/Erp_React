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

interface BudgetReportProjectSortProps {
  tabRender?: ReactNode;
}

function BudgetReportProjectSort(props: BudgetReportProjectSortProps) {
  const { tabRender } = props;

  const [formData, setFormData] = useState({
    year: undefined,
    area: undefined,
    kind: 1,
  });

  // head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد بودجه",
      name: "Code",
    },
    {
      title: "شرح ردیف",
      name: "Description",
      align: "left",
    },

    {
      title: "مصوب",
      name: "Mosavab",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "Expense",
      split: true,
      align: "left",
      width: "100px",
    },
    {
      title: "درصد جذب",
      name: "jazb",
      percent: true,
    },
    {
      title: "منطقه",
      name: "AreaNameShort",
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

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetReportProjectSortForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          printData={{
            data: [],
            footer: [{}],
          }}
        />
      ),
      colspan: 9,
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
    }
  );

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    dataQuery.data?.data || [],
    "Mosavab"
  );
  const sumExpense = sumFieldsInSingleItemData(
    dataQuery.data?.data || [],
    "Expense"
  );

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 3,
    Code: null,
    AreaNameShort: "",
    jazb: getPercent(sumExpense, sumMosavab),
    Description: null,
    Mosavab: sumMosavab,
    Expense: sumExpense,
  };

  // table data
  let CalculatedMosavab = 0;
  const formatTableData = (unFormatData: any): any => {
    const formatedData: any = unFormatData.map((item: any, i: any) => {
      const result = {
        ...item,
        share: getPercentFloat(item.Mosavab, sumMosavab, 1) + "%",
        jazb: getPercent(item.Expense, item.Mosavab),
        sum:
          getPercentFloat(item.Mosavab + CalculatedMosavab, sumMosavab, 1) +
          "%",
        number: i + 1,
      };

      CalculatedMosavab += item.Mosavab;
      return result;
    });

    return formatedData;
  };

  const tableData: any = (formatTableData(dataQuery.data?.data) as any) || [];

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroups}
      footer={tableFooter}
      data={tableData}
    />
  );
}

export default BudgetReportProjectSort;
