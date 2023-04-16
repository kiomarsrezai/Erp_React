import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import SepratoeBudgetForm from "components/sections/forms/budget/seprator-budget-form";

import { TableHeadShape } from "types/table-type";
import { useQuery } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";

interface SepratorSingleItemDataShape {
  description: string;
  code: string;
  mosavab: number;
  creditAmount: number;
  expense: number;
  percentBud: number;
}

const formatTableData = (
  unFormatData: SepratorSingleItemDataShape[]
): SepratorSingleItemDataShape[] => {
  const formatedData: SepratorSingleItemDataShape[] = unFormatData.map(
    (item, i) => ({
      id: i + 1,
      code: item.code,
      description: item.description,
      mosavab: item.mosavab,
      creditAmount: item.creditAmount,
      expense: item.expense,
      percentBud: item.percentBud,
      actions: "",
    })
  );

  return formatedData;
};

function BudgetSepratorPage() {
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
    },
    {
      title: "کد",
    },
    {
      title: "شرح",
    },
    {
      title: "مصوب",
    },
    {
      title: "ت اعتبار",
    },
    {
      title: "عملکرد",
    },
    {
      title: "% جذب",
    },
    {
      title: "عملیات",
    },
  ];

  const tableHeadGroup = [
    {
      title: <SepratoeBudgetForm />,
      colspan: 8,
    },
  ];

  // data
  const sepratorQuery = useQuery(
    reactQueryKeys.budget.seprator.getData,
    () => sepratorBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = sepratorQuery.data
    ? formatTableData(sepratorQuery.data?.data)
    : [];

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        headGroups={tableHeadGroup}
      />
    </AdminLayout>
  );
}

export default BudgetSepratorPage;
