import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FixedTable from "components/data/table/fixed-table";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FixedModal from "components/ui/modal/fixed-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import CodingBudgetActionModal from "./coding-budget-action-modal";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import CodingBudgetModal2 from "./coding-budget-modal-2";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
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

interface CodingBudgetModal1Props {
  data: any[];
  formData: any;
  motherId: number;
  modal1Title: string;
}
function CodingBudgetModal1(props: CodingBudgetModal1Props) {
  const { data, formData, motherId, modal1Title } = props;

  // action modal
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [titleActionModal, setTitleActionModal] = useState<ReactNode>("");
  const [modalFormInitialData, setModalFormInitialData] = useState(null);

  const handleAddClick = () => {
    setTitleActionModal(
      <>
        <div>{modal1Title}</div>
      </>
    );
    setModalFormInitialData(null);
    setIsOpenActionModal(true);
  };

  const handleClickEditBtn = (row: any) => {
    setTitleActionModal(
      <>
        <div>{modal1Title}</div>
        <div>{`${row.code} - ${row.description}`}</div>
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
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState<null | number>(
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

  // modal 2
  const detailCodingMutation = useMutation(codingBudgetApi.getData);
  const [rowMotherId, setRowMotherId] = useState(0);

  const openMoreDetail = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
    setTitleActionModal(
      <>
        <div>{modal1Title}</div>
        <div>{`${row.code} - ${row.description}`}</div>
      </>
    );
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
        revenueType: item.codingKindId,
        showCell: getDataItemIcon(item.show),
        actions: actionButtons,
        bgcolor: rowMotherId === item.id ? "rgba(187,222,251)" : "",
      })
    );

    return formatedData;
  };

  const tableData = dataMutation.data?.data
    ? formatTableData(dataMutation.data.data)
    : data
    ? formatTableData(data)
    : [];

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
        {/* modal 2 */}
        <Box sx={{ width: "50%" }}>
          <CodingBudgetModal2
            data={detailCodingMutation.data?.data || []}
            loading={detailCodingMutation.isLoading}
            formData={formData}
            motherId={rowMotherId}
            baseModal2Title={titleActionModal}
          />
        </Box>
      </Box>

      {/* action modal */}
      <FixedModal
        open={isOpenActionModal}
        handleClose={() => setIsOpenActionModal(false)}
        maxHeight="70%"
        maxWidth="md"
        topTitle={modalFormInitialData ? "ویرایش آیتم" : "افزودن آیتم"}
        title={titleActionModal}
      >
        <CodingBudgetActionModal
          onDoneTask={handleDoneActionTask}
          initialData={modalFormInitialData}
          level={4}
          motherId={motherId}
          formData={formData}
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

export default CodingBudgetModal1;
