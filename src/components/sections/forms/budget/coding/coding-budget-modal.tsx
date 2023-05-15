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

interface CodingBudgetModalProps {
  data: any[];
  formData: any;
}
function CodingBudgetModal(props: CodingBudgetModalProps) {
  const { data, formData } = props;

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

  // more detail
  const detailCodingMutation = useMutation(codingBudgetApi.getData);

  const openMoreDetail = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
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

export default CodingBudgetModal;
