import AdminLayout from "components/layout/admin-layout";
import DataTable from "components/data/table/fixed-table";

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
    },
    {
      title: "salam 4",
    },
    {
      title: "salam 5",
    },
    {
      title: "salam 6",
    },
    {
      title: "salam 7",
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
      <DataTable heads={tableHeads} headGroups={tableHeadGroups} data={data} />
    </AdminLayout>
  );
}

export default BudgetProposalPage;
