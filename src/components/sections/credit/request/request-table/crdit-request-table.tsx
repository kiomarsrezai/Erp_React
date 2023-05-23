import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FixedModal from "components/ui/modal/fixed-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import AddIcon from "@mui/icons-material/Add";

import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import { useMutation } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import CreditRequestTableActionModal from "./credit-request-table-action-modal";

interface TableDataItemShape {
  number: ReactNode;
  description: ReactNode;
  organ: ReactNode;
  rate: ReactNode;
  price: ReactNode;
  actions: ((data: TableDataItemShape) => ReactNode) | ReactNode;
}

interface CreidtRequestFormTableProps {
  formData: any;
  firstStepCrossed: boolean;
}

function CreidtRequestTable(props: CreidtRequestFormTableProps) {
  const { formData, firstStepCrossed } = props;

  // head group
  const [isOpenAddItemModal, setIsOpenAddItemModal] = useState(false);

  const insertToTableMutation = useMutation(creditRequestApi.insertToTable, {
    onSuccess: () => {
      setIsOpenAddItemModal(false);
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

  const handleDoneAddTask = (values: any) => {
    insertToTableMutation.mutate({
      ...values,
      [creditRequestConfig.request_id]:
        formData[creditRequestConfig.request_id],
    });
  };

  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton
          color="primary"
          size="small"
          onClick={() => setIsOpenAddItemModal(true)}
        >
          <AddIcon />
        </IconButton>
      ),
      colspan: 6,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "واحد",
      name: "organ",
      align: "left",
    },
    {
      title: "نرخ",
      align: "left",
      split: true,
      name: "rate",
    },
    {
      title: "مبلغ",
      name: "price",
      split: true,
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];
  //   edit modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const updateTableItemMutation = useMutation(
    creditRequestApi.updateTableItem,
    {
      onSuccess: () => {
        setIsOpenEditModal(false);
        enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
          variant: "error",
        });
      },
    }
  );

  const handleDoneUpdateTask = (values: any) => {
    updateTableItemMutation.mutate({
      ...values,
      // id:
    });
  };

  // delete item
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState(false);

  const onConfrimDelete = () => {
    alert("shoud delete");
  };

  const onCancelDelete = () => {
    setIsShowConfrimDelete(false);
  };

  // data
  const ActionButtons = (row: TableDataItemShape) => {
    return (
      <>
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
          onClick={() => setIsOpenEditModal(true)}
        >
          <EditIcon />
        </IconButton>
      </>
    );
  };

  const data: TableDataItemShape[] = [
    {
      description: "تست",
      number: "1",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
      actions: ActionButtons,
    },
    {
      description: "تست",
      number: "2",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
      actions: ActionButtons,
    },
    {
      description: "تست",
      number: "3",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
      actions: ActionButtons,
    },
    {
      description: "تست",
      number: "4",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
      actions: ActionButtons,
    },
    {
      description: "تست",
      number: "1",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
      actions: ActionButtons,
    },
    {
      description: "تست",
      number: "2",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
      actions: ActionButtons,
    },
  ];
  //   footer
  const tableFooter: TableDataItemShape = {
    description: "",
    number: "",
    organ: "",
    price: 12462314,
    rate: 12462314,
    actions: <></>,
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        topHeadGroups={firstStepCrossed ? headGroup : undefined}
        data={data}
        footer={tableFooter}
        notFixed
      />

      {/* add modal */}
      <FixedModal
        open={isOpenAddItemModal}
        handleClose={() => setIsOpenAddItemModal(false)}
        title="افزودن آیتم"
      >
        <CreditRequestTableActionModal onDoneTask={handleDoneAddTask} />
      </FixedModal>

      {/* edit modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        title="ویرایش آیتم"
      >
        <CreditRequestTableActionModal onDoneTask={handleDoneUpdateTask} />
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

export default CreidtRequestTable;
