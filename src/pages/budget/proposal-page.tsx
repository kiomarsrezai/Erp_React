import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";

function BudgetProposalPage() {
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: "salam 1",
      colspan: 2,
    },
    {
      title: "salam 2",
      colspan: 3,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "salam 3",
      name: "value",
    },
    {
      title: "salam 4",
      name: "value",
    },
    {
      title: "salam 5",
      name: "value",
    },
    {
      title: "salam 6",
      name: "value",
    },
    {
      title: "salam 7",
      name: "value",
    },
  ];

  const data: any = [
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
    {
      value: "afwe",
    },
  ];

  return (
    <AdminLayout>
      <FixedTable heads={tableHeads} headGroups={tableHeadGroups} data={data} />
    </AdminLayout>
  );
}

export default BudgetProposalPage;
