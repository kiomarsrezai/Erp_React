import { useQuery } from "@tanstack/react-query";
import { connectBudgetApi } from "api/budget/budget-connect-api";
import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import AdminLayout from "components/layout/admin-layout";
import BudgetConnectForm from "components/sections/budget/connect/budget-connect-form";
import { budgetConnectConfig } from "config/features/budget/budget-connect-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ReactNode, useState } from "react";
import { GetSingleBudgetConnectItemShape } from "types/data/budget/budget-connect-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import EditIcon from "@mui/icons-material/Edit";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function BudgetConnectPage() {
  const [formData, setFormData] = useState({
    [budgetConnectConfig.YEAR]: undefined,
    [budgetConnectConfig.AREA]: undefined,
    [budgetConnectConfig.BUDGET_METHOD]: undefined,
  });

  //   heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد",
      name: "code",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "مصوب",
      align: "left",
      name: "mosavab",
      split: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetConnectForm formData={formData} setFormData={setFormData} />
      ),
      colspan: tableHeads.length,
    },
  ];

  // actions
  const actionButtons = (
    <IconButton size="small" color="primary" onClick={() => {}}>
      <EditIcon />
    </IconButton>
  );

  //   data
  const formatTableData = (
    unFormatData: GetSingleBudgetConnectItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const proposalQuery = useQuery(
    reactQueryKeys.budget.connect.getData,
    () => connectBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = proposalQuery.data
    ? formatTableData(proposalQuery.data?.data)
    : [];

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
      />
    </AdminLayout>
  );
}

export default BudgetConnectPage;
