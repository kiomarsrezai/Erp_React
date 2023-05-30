import IconButton from "@mui/material/IconButton";
import FixedTable from "components/data/table/fixed-table";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FixedModal from "components/ui/modal/fixed-modal";
import CodingBudgetActionModal from "./coding-budget-action-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { codingBudgetApi } from "api/budget/coding-api";
import { globalConfig } from "config/global-config";
import { codingBudgetConfig } from "config/features/budget/coding-config";

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

interface CodingBudgetModal3Props {
  data: any[];
  motherId: number;
  formData: any;
  baseModal3Title: ReactNode;
}
function CodingBudgetModal3(props: CodingBudgetModal3Props) {
  const { data, motherId, formData, baseModal3Title } = props;

  // action modal
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [titleActionModal, setTitleActionModal] = useState<ReactNode>("");
  const [modalFormInitialData, setModalFormInitialData] = useState(null);

  const handleAddClick = () => {
    setTitleActionModal(<>{baseModal3Title}</>);
    setModalFormInitialData(null);
    setIsOpenActionModal(true);
  };

  const handleClickEditBtn = (row: any) => {
    setTitleActionModal(
      <>
        {baseModal3Title}
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
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState<number | null>(
    null
  );

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

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => (
    <>
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
    </>
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

  return (
    <>
      <FixedTable
        data={tableData}
        heads={tableHeads}
        headGroups={headGroup}
        notFixed
      />

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
          initialData={modalFormInitialData}
          level={6}
          onDoneTask={handleDoneActionTask}
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

export default CodingBudgetModal3;
