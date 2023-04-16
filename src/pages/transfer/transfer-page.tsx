import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import TransferForm from "components/sections/forms/transfer-form";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { useQuery } from "@tanstack/react-query";
import { transferApi } from "api/transfer/transfer-api";
import { GetSingleTransferItemShape } from "types/data/transfer/transfer-type";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ReactNode } from "react";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  id: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  codeAcc: ReactNode;
  titleAcc: ReactNode;
  actions: ReactNode;
}

const formatTableData = (
  unFormatData: GetSingleTransferItemShape[]
): TableDataItemShape[] => {
  const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
    id: i + 1,
    code: item.code,
    description: item.description,
    mosavab: item.mosavab,
    codeAcc: item.codeAcc,
    titleAcc: item.titleAcc,
    actions: "",
  }));

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
      align: "left",
    },
    {
      title: "مصوب",
      align: "left",
    },
    {
      title: "کد حسابداری",
    },
    {
      title: "شرح حسابداری",
      align: "left",
    },
    {
      title: "عملیات",
    },
  ];

  // data
  const transferQuery = useQuery(
    reactQueryKeys.transfer.getData,
    () => transferApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = transferQuery.data
    ? formatTableData(transferQuery.data?.data)
    : [];

  // footer
  const tableFooter: TableDataItemShape = {
    id: "ردیف",
    code: "-",
    description: "-",
    mosavab: sumFieldsInSingleItemData(transferQuery.data?.data, "mosavab"),
    codeAcc: "-",
    titleAcc: "-",
    actions: "-",
  };

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
        footer={tableFooter}
      />
    </AdminLayout>
  );
}

export default TransferPage;
