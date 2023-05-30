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
import CodingBudgetActionModal from "./coding-budget-action-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import CodingBudgetModal3 from "./coding-budget-modal-3";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
import { codingBudgetApi } from "api/budget/coding-api";
import { useMutation } from "@tanstack/react-query";
import { codingBudgetConfig } from "config/features/budget/coding-config";
import { globalConfig } from "config/global-config";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";

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

interface CodingBudgetModal2Props {
  data: any[];
  loading: boolean;
  formData: any;
  motherId: number;
  baseModal2Title: ReactNode;
}
function CodingBudgetModal2(props: CodingBudgetModal2Props) {
  const { data, loading, formData, motherId, baseModal2Title } = props;

  // action modal
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [titleActionModal, setTitleActionModal] = useState<ReactNode>("");
  const [modalFormInitialData, setModalFormInitialData] = useState(null);

  const handleAddClick = () => {
    setTitleActionModal(<>{baseModal2Title}</>);
    setModalFormInitialData(null);
    setIsOpenActionModal(true);
  };

  const handleClickEditBtn = (row: any) => {
    setTitleActionModal(
      <>
        {baseModal2Title}
        <div>
          {row.code} - {row.description}
        </div>
      </>
    );
    setModalFormInitialData(row);
    setIsOpenActionModal(true);
  };

  const dataMutation = useMutation(codingBudgetApi.getData);

  const handleDoneActionTask = () => {
    setIsOpenActionModal(false);

    dataMutation.mutate({
      ...formData,
      [codingBudgetConfig.mother_id]: motherId,
    });
  };

  // delete item
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState<number | null>(
    null
  );

  const [textDeleteModal, setTextDeleteModal] = useState("");

  const deleteMutation = useMutation(codingBudgetApi.deleteItem, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      setIsShowConfrimDelete(null);
      handleDoneActionTask();
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const onConfrimDelete = () => {
    deleteMutation.mutate(isShowConfrimDelete || 0);
  };

  const onCancelDelete = () => {
    setIsShowConfrimDelete(null);
  };

  const handleClickDelete = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
    const deleteText = `آیا مایل به حذف ${row.code} - ${row.description} هستید ؟`;
    setTextDeleteModal(deleteText);
    setIsShowConfrimDelete(row.id);
  };

  // head group
  const headGroup: TableHeadGroupShape = [
    {
      title: !motherId ? (
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="caption">هیچ آیتمی انتخاب نشده است</Typography>
        </Box>
      ) : (
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

  // modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowMotherId, setRowMotherId] = useState(0);

  const detailCodingMutation = useMutation(codingBudgetApi.getData);

  const handleListClick = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
    setTitleActionModal(
      <>
        {baseModal2Title}
        <div>
          {row.code} - {row.description}
        </div>
      </>
    );
    setRowMotherId(row.id);
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
        onClick={() => handleClickDelete(row)}
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
        crudCell: getDataItemIcon(item.crud),
        level: item.levelNumber,
        revenueType: item.codingRevenueKind,
        showCell: getDataItemIcon(item.show),
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const tableData = dataMutation.data?.data
    ? formatTableData(dataMutation.data.data)
    : data
    ? formatTableData(data)
    : [];

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

      {/* modal 3 */}
      <FixedModal
        open={isOpenModal}
        loading={detailCodingMutation.isLoading}
        handleClose={() => setIsOpenModal(false)}
        title={titleActionModal}
      >
        <CodingBudgetModal3
          data={detailCodingMutation.data?.data || []}
          motherId={rowMotherId}
          formData={formData}
          baseModal3Title={titleActionModal}
        />
      </FixedModal>

      {/* action modal */}
      <FixedModal
        open={isOpenActionModal}
        handleClose={() => setIsOpenActionModal(false)}
        maxHeight="70%"
        maxWidth="md"
        title={titleActionModal}
        topTitle={modalFormInitialData ? "ویرایش آیتم" : "افزودن آیتم"}
      >
        <CodingBudgetActionModal
          onDoneTask={handleDoneActionTask}
          initialData={modalFormInitialData}
          motherId={motherId}
          level={5}
        />
      </FixedModal>

      {/* confrim delete */}
      <ConfrimProcessModal
        onCancel={onCancelDelete}
        onConfrim={onConfrimDelete}
        open={isShowConfrimDelete !== null}
        title="حذف آیتم"
        text={textDeleteModal}
      />
    </>
  );
}

export default CodingBudgetModal2;
