import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import TransferForm from "components/sections/forms/transfer-form";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import BalanceIcon from "@mui/icons-material/Balance";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FixedModal from "components/ui/modal/fixed-modal";
import TransferModalTable from "components/sections/transfer/transfer-modal-table";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useSnackbar } from "notistack";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { transferApi } from "api/transfer/transfer-api";
import { GetSingleTransferItemShape } from "types/data/transfer/transfer-type";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ReactNode, useState } from "react";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { globalConfig } from "config/global-config";
import { transferConfig } from "config/features/transfer/transfer-config";
import WindowLoading from "components/ui/loading/window-loading";

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
    [transferConfig.YEAR]: 32,
    [transferConfig.AREA]: 1,
    [transferConfig.BUDGET_METHOD]: 1,
  });

  // modal
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleDoneModalTask = () => {
    handleCloseModal();
    getDataMutation.mutate(formData);
  };

  const [modalTitle, setModalTitle] = useState("");

  // table heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <TransferForm formData={formData} setFormData={setFormData} />,
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

  // table action
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const getDataMutation = useMutation(transferApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.transfer.getData, data);
    },
  });

  const insertCodeAccMutation = useMutation(transferApi.insertCodeAcc, {
    onSuccess: () => {
      getDataMutation.mutate(formData);
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

  const DeleteCodeAccMutation = useMutation(transferApi.deleteCodeAcc, {
    onSuccess: () => {
      getDataMutation.mutate(formData);
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

  const dataTableMutation = useMutation(transferApi.getModalData);

  const [activeItemCodeAcc, setActiveItemCodeAcc] = useState<any>("");
  const handleClickBalanceIcon = (row: TableDataItemShape) => {
    // console.log(row);
    setActiveItemCodeAcc(row.codeAcc);

    dataTableMutation.mutate({ ...row, ...formData });

    const title = `${row.description} (${row.code})`;
    setModalTitle(title);

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
        >
          <AddIcon />
        </IconButton>

        <IconButton
          color="error"
          size="small"
          onClick={() => DeleteCodeAccMutation.mutate(row.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };

  // table data
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

      <FixedModal
        open={openModal}
        handleClose={handleCloseModal}
        loading={dataTableMutation.isLoading}
        title={modalTitle}
      >
        <TransferModalTable
          data={dataTableMutation.data?.data || []}
          codeAcc={activeItemCodeAcc}
          onDoneTask={handleDoneModalTask}
        />
      </FixedModal>

      <WindowLoading
        active={
          getDataMutation.isLoading ||
          insertCodeAccMutation.isLoading ||
          DeleteCodeAccMutation.isLoading
        }
      />
    </AdminLayout>
  );
}

export default TransferPage;
