import FixedTable from "components/data/table/fixed-table";
import RequestTopheadTableForm from "./request-tophead-table-form";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import FixedModal from "components/ui/modal/fixed-modal";
import RequestTopheadTableModal from "./request-tophead-table-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

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
  const headGroup: TableHeadGroupShape = [
    {
      title: <RequestTopheadTableForm />,
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

  const handleDoneUpdateTask = () => {
    setIsOpenEditModal(false);
  };

  // delete item
  // onCancel={onCancelDelete}
  // onConfrim={onConfrimDelete}
  // open={showConfrimDelete}
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

      {/* edit modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        title="ویرایش آیتم"
      >
        <RequestTopheadTableModal onDoneTask={handleDoneUpdateTask} />
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
