import AdminLayout from "components/layout/admin-layout";
import DataTable from "components/data/table/fixed-table";
import TransferForm from "components/sections/forms/transfer-form";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { useQuery } from "@tanstack/react-query";
import { transferApi } from "api/transfer/transfer-api";

interface GetSingleTransferItemShape {
  description: string;
  code: string;
  mosavab: number;
  codeAcc: number;
  titleAcc: string;
}

const formatTableData = (
  unFormatData: GetSingleTransferItemShape[]
): GetSingleTransferItemShape[] => {
  const formatedData: GetSingleTransferItemShape[] = unFormatData.map(
    (item, i) => ({
      id: i + 1,
      code: item.code,
      description: item.description,
      mosavab: item.mosavab,
      codeAcc: item.codeAcc,
      titleAcc: item.titleAcc,
      actions: "",
    })
  );

  return formatedData;
};

function TransferPage() {
  // heads
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

  // data
  const transferQuery = useQuery(["transfer"], () => transferApi.getData({}));

  const tableData = transferQuery.data
    ? formatTableData(transferQuery.data?.data)
    : [];

  return (
    <AdminLayout>
      <DataTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
      />
    </AdminLayout>
  );
}

export default TransferPage;
