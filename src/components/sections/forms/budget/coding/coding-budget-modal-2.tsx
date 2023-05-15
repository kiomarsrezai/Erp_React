import IconButton from "@mui/material/IconButton";
import FixedTable from "components/data/table/fixed-table";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FixedModal from "components/ui/modal/fixed-modal";
import CodingBudgetActionModal from "./coding-budget-action-modal";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

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

interface CodingBudgetModal2Props {
  data: any[];
}
function CodingBudgetModal2(props: CodingBudgetModal2Props) {
  const { data } = props;

  // action modal
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [modalActionType, setModalActionType] = useState<"edit" | "create">(
    "create"
  );
  const [titleActionModal, setTitleActionModal] = useState("");

  const handleAddClick = () => {
    setTitleActionModal("افزودن آیتم");
    setModalActionType("create");
    setIsOpenActionModal(true);
  };

  const handleClickEditBtn = () => {
    setTitleActionModal("ویرایش آیتم");
    setModalActionType("edit");
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

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => (
    <>
      <IconButton
        size="small"
        color="error"
        onClick={() => setIsShowConfrimDelete(true)}
      >
        <DeleteIcon />
      </IconButton>

      <IconButton size="small" color="primary" onClick={handleClickEditBtn}>
        <EditIcon />
      </IconButton>
    </>
  );

  const formatTableData = (
    unFormatData: GetSingleCodingItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        rowNumber: i + 1,
        code: item.code,
        description: item.description,
        crud: (
          <Checkbox
            defaultChecked={item.crud}
            size="small"
            onChange={() => {}}
          />
        ),
        level: item.levelNumber,
        revenueType: item.codingRevenueKind,
        show: <Checkbox defaultChecked={item.show} size="small" />,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

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
      >
        <CodingBudgetActionModal
          onDoneTask={() => {}}
          actionType={modalActionType}
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

export default CodingBudgetModal2;
