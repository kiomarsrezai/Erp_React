import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import TransferForm from "components/sections/forms/transfer-form";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import BalanceIcon from "@mui/icons-material/Balance";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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
      name: "id",
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
      title: "کد حسابداری",
      name: "codeAcc",
    },
    {
      title: "شرح حسابداری",
      align: "left",
      name: "titleAcc",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // data
  const actionButtons = (
    <Box display="flex">
      <IconButton color="primary" size="small">
        <BalanceIcon />
      </IconButton>

      <IconButton color="success" size="small">
        <AddIcon />
      </IconButton>

      <IconButton color="error" size="small">
        <DeleteIcon />
      </IconButton>
    </Box>
  );

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
      actions: actionButtons,
    }));

    return formatedData;
  };

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
    id: "جمع",
    code: "",
    description: "",
    mosavab: sumFieldsInSingleItemData(transferQuery.data?.data, "mosavab"),
    codeAcc: "",
    titleAcc: "",
    actions: "",
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
