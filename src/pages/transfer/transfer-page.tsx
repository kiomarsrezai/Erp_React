import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import grey from "@mui/material/colors/grey";
import BalanceIcon from "@mui/icons-material/Balance";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FixedModal from "components/ui/modal/fixed-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import WindowLoading from "components/ui/loading/window-loading";
import TransferForm from "components/sections/report/transfer/transfer-form";
import TransferModal1 from "components/sections/report/transfer/transfer-modal-1";

import { useSnackbar } from "notistack";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { transferApi } from "api/transfer/transfer-api";
import { GetSingleTransferItemShape } from "types/data/transfer/transfer-type";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ReactNode, useEffect, useRef, useState } from "react";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { globalConfig } from "config/global-config";
import { transferConfig } from "config/features/transfer/transfer-config";
import { BsEraserFill } from "react-icons/bs";
import SectionGuard from "components/auth/section-guard";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";

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
    [transferConfig.YEAR]: undefined,
    [transferConfig.AREA]: undefined,
    [transferConfig.BUDGET_METHOD]: undefined,
  });

  // modal
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
    afterCloseAnyModal();
  };

  const handleOpenModal = () => {
    clearTimeout(activeTimeOut.current);
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
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
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
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const dataTableMutation = useMutation(transferApi.getModalData);

  const handleClickBalanceIcon = (row: TableDataItemShape | any) => {
    dataTableMutation.mutate({ ...row, ...formData });

    const title = `${row.description} (${row.code})`;
    setModalTitle(title);
    setActiveID(row.id);
    handleOpenModal();
  };

  const handleIconClick = (
    row: GetSingleTransferItemShape & TableDataItemShape
  ) => {
    DeleteCodeAccMutation.mutate(row.id);
  };

  // delete row
  const [removeItemId, setRemoveItemId] = useState<null | number>(null);
  const [confrimRemoveText, setConfrimRemoveText] = useState<string>("");

  const onConfrimDeleteModal = () => {
    DeleteRowMutation.mutate(removeItemId as number);
    onCancelDeleteModal();
  };
  const onCancelDeleteModal = () => {
    setRemoveItemId(null);
  };

  const DeleteRowMutation = useMutation(transferApi.deleteRow, {
    onSuccess: () => {
      getDataMutation.mutate(formData);
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });
  const handleDeleteClick = (
    row: GetSingleTransferItemShape & TableDataItemShape
  ) => {
    const text = `آیا مایل به حذف کردن ردیف ${row.description} هستید ؟`;
    setConfrimRemoveText(text);
    setRemoveItemId(row.id);
  };

  const actionButtons = (
    row: GetSingleTransferItemShape & TableDataItemShape
  ) => {
    return (
      <Box display="flex" justifyContent="end">
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.FINANCIAL__CODING_PAGE,
            accessNamesConfig.FINANCIAL__CODING_PAGE_DELETE_ROW,
          ])}
        >
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDeleteClick(row)}
          >
            <DeleteIcon />
          </IconButton>
        </SectionGuard>

        {/* {(!!row.titleAcc || !!row.codeAcc) && ( */}
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.FINANCIAL__CODING_PAGE,
            accessNamesConfig.FINANCIAL__CODING_PAGE_DELETE_CODE,
          ])}
        >
          <IconButton
            color="error"
            size="small"
            onClick={() => handleIconClick(row)}
          >
            <BsEraserFill />
          </IconButton>
        </SectionGuard>
        {/* )} */}

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.FINANCIAL__CODING_PAGE,
            accessNamesConfig.FINANCIAL__CODING_PAGE_ADD,
          ])}
        >
          <IconButton
            color="success"
            size="small"
            onClick={() => insertCodeAccMutation.mutate(row.id)}
          >
            <AddIcon />
          </IconButton>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.FINANCIAL__CODING_PAGE,
            accessNamesConfig.FINANCIAL__CODING_PAGE_BALANCE,
          ])}
        >
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleClickBalanceIcon(row)}
          >
            <BalanceIcon />
          </IconButton>
        </SectionGuard>
      </Box>
    );
  };

  // table data
  const [activeID, setActiveID] = useState(0);

  const activeTimeOut = useRef<any>(null);

  useEffect(() => {
    return () => clearTimeout(activeTimeOut.current);
  }, []);

  const afterCloseAnyModal = () => {
    activeTimeOut.current = setTimeout(() => {
      setActiveID(0);
    }, 3000);
  };

  let prevRowColor = "#fff";
  let nextRowColor = "rgba(224,224,224,var(--hover-color))";
  const getBgColor = (
    item: GetSingleTransferItemShape,
    previtem: GetSingleTransferItemShape | undefined
  ) => {
    if (item.code !== previtem?.code) {
      [prevRowColor, nextRowColor] = [nextRowColor, prevRowColor];
    }
    return activeID === item.id ? "#ffb1b1" : prevRowColor;
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
      bgcolor: getBgColor(item, unFormatData[i - 1]),
      bgcolor_pulse: activeID === item.id,
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
        <TransferModal1
          data={dataTableMutation.data?.data || []}
          areaId={formData[transferConfig.AREA] || 0}
          onDoneTask={handleDoneModalTask}
        />
      </FixedModal>

      {/* remove detail item modal*/}
      <ConfrimProcessModal
        open={removeItemId !== null}
        onCancel={onCancelDeleteModal}
        onConfrim={onConfrimDeleteModal}
        text={confrimRemoveText}
      />

      {/* lodaing */}

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
