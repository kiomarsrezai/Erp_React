import { useQuery } from "@tanstack/react-query";
import { budgetEditApi } from "api/budget/budget-edit-api";
import FixedTable from "components/data/table/fixed-table";
import AdminLayout from "components/layout/admin-layout";
import BudgetEditForm from "components/sections/budget/edit/budget-edit-form";
import { budgetEditConfig } from "config/features/budget/budget-edit-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { useState } from "react";
import { GetSingleBudgetEditItemShape } from "types/data/budget/budget-edit-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";

function BudgetEditPage() {
  const [formData, setFormData] = useState({
    [budgetEditConfig.YEAR]: undefined,
    [budgetEditConfig.AREA]: undefined,
    [budgetEditConfig.BUDGET_METHOD]: undefined,
  });

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <BudgetEditForm formData={formData} setFormData={setFormData} />,
      colspan: 7,
    },
  ];
  //   heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "50px",
    },
    {
      title: "کد",
      name: "code",
      width: "150px",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "مصوب",
      align: "left",
      name: "mosavabPublic",
      split: true,
      width: "150px",
    },
    {
      title: "کاهش",
      align: "left",
      name: "decrease",
      split: true,
      width: "150px",
    },
    {
      title: "افزایش",
      align: "left",
      name: "increase",
      split: true,
      width: "150px",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "80px",
    },
  ];

  //   data
  const formatTableData = (
    unFormatData: GetSingleBudgetEditItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      "textcolor-description": item.id === null ? "blue" : "",
      "textcolor-code": item.id === null ? "blue" : "",
      "textcolor-mosavabPublic": item.id === null ? "blue" : "",
      actions: "actionButtons",
    }));

    return formatedData;
  };

  const budgetEditQuery = useQuery(
    reactQueryKeys.budget.edit.getData,
    () => budgetEditApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = budgetEditQuery.data
    ? formatTableData(budgetEditQuery.data?.data)
    : [];

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
        // footer={tableFooter}
      />
    </AdminLayout>
  );
}

export default BudgetEditPage;
