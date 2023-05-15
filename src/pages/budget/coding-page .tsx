import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import CodingBudgetForm from "components/sections/forms/budget/coding/coding-budget-form";
import FixedModal from "components/ui/modal/fixed-modal";
import CodingBudgetModal from "components/sections/forms/budget/coding/coding-budget-modal";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CodingBudgetActionModal from "components/sections/forms/budget/coding/coding-budget-action-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { codingBudgetApi } from "api/budget/coding-api";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
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

function BudgetCodingPage() {
  const [formData, setFormData] = useState({
    [codingBudgetConfig.BUDGET_METHOD]: undefined,
  });

  // action modal
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [actionMotherId, setActionMotherId] = useState(0);
  const [actionLevelNumber, setActionLevelNumber] = useState(0);
  const [actionModaInitialData, setActionModaInitialData] = useState<any>(null);

  const handleClickEditBtn = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
    setActionModaInitialData(row);
    setActionLevelNumber(row.levelNumber || 0);
    setActionMotherId(row.id || 0);
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

  // form heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <CodingBudgetForm formData={formData} setFormData={setFormData} />,
      colspan: 8,
    },
  ];

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
  const detailCodingMutation = useMutation(codingBudgetApi.getData);

  const openDeatilModal = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
    setActionMotherId(row.id || 0);
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
    <Stack direction="row" spacing={0.5} justifyContent={"start"}>
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

      {row.levelNumber === 3 && (
        <IconButton
          size="small"
          color="primary"
          onClick={() => openDeatilModal(row)}
        >
          <FormatListBulletedIcon />
        </IconButton>
      )}
    </Stack>
  );

  const getBgColor = (levelNumber: number) => {
    if (levelNumber === 1) {
      return "rgb(248,203,173)";
    } else if (levelNumber === 2) {
      return "rgb(198,224,180)";
    } else if (levelNumber === 3) {
      return "#fff";
    }
  };

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
        bgcolor: getBgColor(item.levelNumber),
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const codingQuery = useQuery(
    reactQueryKeys.budget.coding.getData,
    () => codingBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = codingQuery.data
    ? formatTableData(codingQuery.data?.data)
    : [];

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={tableData || []}
        />
      </AdminLayout>

      {/* detail modal */}
      <FixedModal
        open={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        maxWidth="xl"
        maxHeight="90%"
        loading={detailCodingMutation.isLoading}
      >
        <CodingBudgetModal
          formData={formData}
          data={detailCodingMutation.data?.data || []}
          motherId={actionMotherId}
        />
      </FixedModal>

      {/* action modal */}
      <FixedModal
        open={isOpenActionModal}
        handleClose={() => setIsOpenActionModal(false)}
        maxHeight="70%"
        maxWidth="md"
        title="ویرایش آیتم"
      >
        <CodingBudgetActionModal
          onDoneTask={handleDoneActionTask}
          level={actionLevelNumber}
          motherId={actionMotherId}
          initialData={actionModaInitialData}
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

export default BudgetCodingPage;
