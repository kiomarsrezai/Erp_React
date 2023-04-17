import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import TransferForm from "components/sections/forms/transfer-form";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import BalanceIcon from "@mui/icons-material/Balance";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FixedModal from "components/ui/modal/fixed-modal";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { transferApi } from "api/transfer/transfer-api";
import { GetSingleTransferItemShape } from "types/data/transfer/transfer-type";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ReactNode, useState } from "react";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import TransferModalTable from "components/sections/transfer/transfer-modal-table";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  codeAcc: ReactNode;
  titleAcc: ReactNode;
  actions: (row: any) => ReactNode;
}

function TransferPage() {
  const [formData, setFormData] = useState({
    [sepratorBudgetConfig.YEAR]: 32,
    [sepratorBudgetConfig.AREA]: 1,
    [sepratorBudgetConfig.BUDGET_METHOD]: 1,
  });

  // modal
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // table heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <TransferForm formData={formData} setFormData={formData} />,
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

  // table data
  const insertCodeAccMutation = useMutation(transferApi.insertCodeAcc, {
    // onSuccess: (data) => {
    //   queryClient.setQueryData(reactQueryKeys.transfer.getData, data);
    // },
  });

  const DeleteCodeAccMutation = useMutation(transferApi.deleteCodeAcc, {
    // onSuccess: (data) => {
    //   queryClient.setQueryData(reactQueryKeys.transfer.getData, data);
    // },
  });

  const dataTableMutation = useMutation(transferApi.getModalData);

  const handleClickBalanceIcon = (row: any) => {
    dataTableMutation.mutate({ ...row, ...formData });
    handleOpenModal();
  };

  const actionButtons = (row: any) => {
    return (
      <Box display="flex">
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleClickBalanceIcon(row)}
        >
          <BalanceIcon />
        </IconButton>

        <IconButton
          color="success"
          size="small"
          onClick={() => insertCodeAccMutation.mutate(row.id)}
          // disabled={insertCodeAccMutation.isLoading}
        >
          <AddIcon />
        </IconButton>

        <IconButton
          color="error"
          size="small"
          onClick={() => DeleteCodeAccMutation.mutate(row.id)}
          // disabled={DeleteCodeAccMutation.isLoading && row.id === }
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };

  const formatTableData = (
    unFormatData: GetSingleTransferItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
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

  // table footer
  const tableFooter: TableDataItemShape = {
    number: "جمع",
    code: "",
    description: "",
    mosavab: sumFieldsInSingleItemData(transferQuery.data?.data, "mosavab"),
    codeAcc: "",
    titleAcc: "",
    actions: () => "",
  };

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
        footer={tableFooter}
      />

      <FixedModal open={openModal} handleClose={handleCloseModal}>
        <TransferModalTable data={dataTableMutation.data?.data || []} />
      </FixedModal>
    </AdminLayout>
  );
}

export default TransferPage;
