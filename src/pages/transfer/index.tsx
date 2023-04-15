import AdminLayout from "components/layout/admin-layout";
import DataTable from "components/data/table/fixed-table";
import TransferForm from "components/sections/forms/transfer-form";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";

function TransferPage() {
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <TransferForm />,
      colspan: 7,
    },
  ];

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
      title: "کد حسابداری",
    },
    {
      title: "شرح حسابداری",
    },
    {
      title: "عملیات",
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

export default TransferPage;
