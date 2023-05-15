import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FixedModal from "components/ui/modal/fixed-modal";
import CodingBudgetModal2 from "./coding-budget-modal-2";
import CodingBudgetActionModal from "./coding-budget-action-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
import { codingBudgetApi } from "api/budget/coding-api";
import { useMutation } from "@tanstack/react-query";
import { codingBudgetConfig } from "config/features/budget/coding-config";

interface TableDataItemShape {
  rowNumber: ReactNode;
  code: ReactNode;
  description: ReactNode;
  level: ReactNode;
  crud: ReactNode;
  show: ReactNode;
  revenueType: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface CodingBudgetDetailModalProps {
  data: any[];
  loading: boolean;
  formData: any;
}
function CodingBudgetDetailModal(props: CodingBudgetDetailModalProps) {
  const { data, loading, formData } = props;

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

  // delete item
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState(false);

  const onConfrimDelete = () => {
    alert("shoud delete");
  };

  const onCancelDelete = () => {
    setIsShowConfrimDelete(false);
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
      name: "crud",
    },
    {
      title: "نمایش",
      name: "show",
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

  // modal
  const [isOpenModal, setIsOpenModal] = useState(false);

  const detailCodingMutation = useMutation(codingBudgetApi.getData);

  const handleListClick = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
    detailCodingMutation.mutate({
      ...formData,
      [codingBudgetConfig.mother_id]: row.id,
    });
    setIsOpenModal(true);
  };

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => (
    <Stack direction="row" spacing={0.5} justifyContent={"center"}>
      <IconButton
        size="small"
        color="error"
        onClick={() => setIsShowConfrimDelete(true)}
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
        onClick={() => handleListClick(row)}
      >
        <FormatListBulletedIcon />
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
        crud: getDataItemIcon(item.crud),
        level: item.levelNumber,
        revenueType: item.codingRevenueKind,
        show: getDataItemIcon(item.show),
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  if (loading) {
    return (
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <>
      <FixedTable
        data={tableData}
        heads={tableHeads}
        headGroups={headGroup}
        notFixed
      />

      {/* modal 2 */}
      <FixedModal
        open={isOpenModal}
        loading={detailCodingMutation.isLoading}
        handleClose={() => setIsOpenModal(false)}
      >
        <CodingBudgetModal2 data={detailCodingMutation.data?.data || []} />
      </FixedModal>

      {/* action modal */}
      <FixedModal
        open={isOpenActionModal}
        handleClose={() => setIsOpenActionModal(false)}
        maxHeight="70%"
        maxWidth="md"
        title={titleActionModal}
      >
        <CodingBudgetActionModal
          onDoneTask={() => {}}
          initialData={modalFormInitialData}
        />
      </FixedModal>

      {/* confrim delete */}
      <ConfrimProcessModal
        onCancel={onCancelDelete}
        onConfrim={onConfrimDelete}
        open={isShowConfrimDelete}
        title="حذف آیتم"
      />
    </>
  );
}

export default CodingBudgetDetailModal;
