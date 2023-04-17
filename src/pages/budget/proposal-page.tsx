import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import ProposalBudgetForm from "components/sections/forms/budget/proposal-budget-form";
import { useState } from "react";
import { proposalConfig } from "config/features/budget/proposal-config";

function BudgetProposalPage() {
  const [formData, setFormData] = useState({
    [proposalConfig.YEAR]: 32,
    [proposalConfig.AREA]: 1,
    [proposalConfig.BUDGET_METHOD]: 1,
  });

  // form heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <ProposalBudgetForm formData={formData} setFormData={setFormData} />
      ),
      colspan: 7,
    },
  ];

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
      title: "عملکرد",
      name: "codeAcc",
    },
    {
      title: "جذب %",
      align: "left",
      name: "titleAcc",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  return (
    <AdminLayout>
      <FixedTable heads={tableHeads} headGroups={tableHeadGroups} data={[]} />
    </AdminLayout>
  );
}

export default BudgetProposalPage;
