import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FixedTable from "components/data/table/fixed-table";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CodingBudgetDetailModal from "./coding-budget-detail-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import CodingBudgetActionModal from "./coding-budget-action-modal";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
import { Checkbox } from "@mui/material";
import { codingBudgetApi } from "api/budget/coding-api";
import { useMutation } from "@tanstack/react-query";
import { codingBudgetConfig } from "config/features/budget/coding-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface TableDataItemShape {
  rowNumber: ReactNode;
  code: ReactNode;
  description: ReactNode;
  level: ReactNode;
  crudCell: ReactNode;
  showCell: ReactNode;
  revenueType: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface CodingBudgetModalProps {
  data: any[];
  formData: any;
  motherId: number;
}
function CodingBudgetModal(props: CodingBudgetModalProps) {
  const { data, formData, motherId } = props;

  // action modal
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [titleActionModal, setTitleActionModal] = useState("");
  const [modalFormInitialData, setModalFormInitialData] = useState(null);

  const handleAddClick = () => {
    setTitleActionModal("افزودن آیتم");
    setModalFormInitialData(null);
    setIsOpenActionModal(true);
  };

  const handleClickEditBtn = (row: any) => {
    setTitleActionModal("ویرایش آیتم");
    setModalFormInitialData(row);
    setIsOpenActionModal(true);
  };

  const handleDoneActionTask = () => {
    setIsOpenActionModal(false);
  };

  // delete item
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState<null | number>(
    null
  );

  const deleteMutation = useMutation(codingBudgetApi.deleteItem, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      setIsShowConfrimDelete(null);
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

  const onConfrimDelete = () => {
    deleteMutation.mutate(isShowConfrimDelete || 0);
  };

  const onCancelDelete = () => {
    setIsShowConfrimDelete(null);
  };

  // head group
  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton color="primary" size="small" onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
      ),
      colspan: 8,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "rowNumber",
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
      title: "سطح",
      name: "level",
    },
    {
      title: "crud",
      name: "crudCell",
    },
    {
      title: "نمایش",
      name: "showCell",
    },
    {
      title: "نوع درامد",
      name: "revenueType",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // more detail
  const detailCodingMutation = useMutation(codingBudgetApi.getData);
  const [rowMotherId, setRowMotherId] = useState(0);

  const openMoreDetail = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
    setRowMotherId(row.id);
    detailCodingMutation.mutate({
      ...formData,
      [codingBudgetConfig.mother_id]: row.id,
    });
  };

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => (
    <Stack direction="row" spacing={0.5} justifyContent={"center"}>
      <IconButton
        size="small"
        color="error"
        onClick={() => setIsShowConfrimDelete(row.id)}
      >
        <DeleteIcon />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        onClick={() => handleClickEditBtn(row)}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        onClick={() => openMoreDetail(row)}
      >
        <ArrowCircleLeftIcon />
      </IconButton>
    </Stack>
  );

  const getDataItemIcon = (active: boolean) => {
    if (active) {
      return <CheckIcon color="primary" />;
    } else {
      return <ClearIcon color="error" />;
    }
  };

  const formatTableData = (
    unFormatData: GetSingleCodingItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        rowNumber: i + 1,
        code: item.code,
        description: item.description,
        crudCell: getDataItemIcon(item.crud),
        level: item.levelNumber,
        revenueType: item.codingRevenueKind,
        showCell: getDataItemIcon(item.show),
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  return (
    <>
      <Box display={"flex"}>
        <Box sx={{ width: "50%", borderRight: 1, borderColor: "grey.400" }}>
          <FixedTable
            data={tableData}
            heads={tableHeads}
            headGroups={headGroup}
            notFixed
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <CodingBudgetDetailModal
            data={detailCodingMutation.data?.data || []}
            loading={detailCodingMutation.isLoading}
            formData={formData}
            motherId={rowMotherId}
          />
        </Box>
      </Box>

      {/* action modal */}
      <FixedModal
        open={isOpenActionModal}
        handleClose={() => setIsOpenActionModal(false)}
        maxHeight="70%"
        maxWidth="md"
        title={titleActionModal}
      >
        <CodingBudgetActionModal
          onDoneTask={handleDoneActionTask}
          initialData={modalFormInitialData}
          level={4}
          motherId={motherId}
        />
      </FixedModal>

      {/* confrim delete */}
      <ConfrimProcessModal
        onCancel={onCancelDelete}
        onConfrim={onConfrimDelete}
        open={isShowConfrimDelete !== null}
        title="حذف آیتم"
      />
    </>
  );
}

export default CodingBudgetModal;
