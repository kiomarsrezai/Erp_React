import FixedTable from "components/data/table/fixed-table";
import FixedModal from "components/ui/modal/fixed-modal";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProposalModal1Search from "./proposal-modal-1-search";
import ProposalModal2 from "../modal-2/proposal-modal-2";
import ProposalModal1Edit from "./proposal-modal-1-edit";

import { useMutation } from "@tanstack/react-query";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { proposalConfig } from "config/features/budget/proposal-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import {
  GetSingleDetailProposalItemShape,
  GetSingleProposalItemShape,
} from "types/data/budget/proposal-type";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  edit: ReactNode;
  percent: ReactNode;
  actions: ((row: any) => ReactNode) | ReactNode;
}

interface ProposalModal1Props {
  data: any[];
  baseTitle: string;
  formData: any;
  baseCodingId: number;
}
function ProposalModal1(props: ProposalModal1Props) {
  const { data, baseTitle, formData, baseCodingId } = props;

  // data
  const getDataMutation = useMutation(proposalBudgetApi.getDetailData);

  const handleDoneActionTask = () => {
    getDataMutation.mutate({
      ...formData,
      [proposalConfig.coding]: baseCodingId,
    });

    setIsOpenInsertModal(false);
    setIsOpenEditModal(false);
  };

  // search modal
  const [isOpenInsertModal, setIsOpenInsertModal] = useState(false);

  const searchMutation = useMutation(proposalBudgetApi.getSearchModal1Data);

  const handleAddClick = () => {
    searchMutation.mutate({
      ...formData,
      [proposalConfig.motherid]: baseCodingId,
    });
    setIsOpenInsertModal(true);
  };

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton color="primary" size="small" onClick={handleAddClick}>
          <SearchIcon />
        </IconButton>
      ),
      colspan: 9,
    },
  ];
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },

    {
      title: "کد",
      name: "code",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      align: "left",
      split: true,
    },
    {
      title: "اصلاح",
      name: "edit",
      align: "left",
      split: true,
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[proposalConfig.BUDGET_METHOD] === 1,
    },
    {
      title: "هزینه",
      name: "expense",
      align: "left",
      split: true,
    },
    {
      title: "% جذب",
      name: "percent",
      percent: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // eidt modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editModalInitialData, setEditModalInitialData] = useState({});
  const handleEditBtnClick = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => {
    setEditModalInitialData(row);
    setIsOpenEditModal(true);
  };

  // delete item
  const [isShowConfrimDelete, setIsShowConfrimDelete] =
    useState<boolean>(false);
  const [idItemShouldDelete, setIdItemShouldDelete] = useState<number>();

  const deleteMutation = useMutation(proposalBudgetApi.deleteModal1, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      handleDoneActionTask();
      setIsOpenEditModal(false);
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

  const onConfrimDelete = () => {
    if (idItemShouldDelete) deleteMutation.mutate(idItemShouldDelete);
  };

  const onCancelDelete = () => {
    setIsShowConfrimDelete(false);
  };

  const handleDeleteBtnClick = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => {
    setIdItemShouldDelete(row.id);
    setIsShowConfrimDelete(true);
  };

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => (
    <>
      <IconButton
        size="small"
        color="error"
        onClick={() => handleDeleteBtnClick(row)}
      >
        <DeleteIcon />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        onClick={() => handleEditBtnClick(row)}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        onClick={() => handleOpenDetailModal(row)}
      >
        <FormatListBulletedIcon />
      </IconButton>
    </>
  );

  const formatTableData = (
    unFormatData: GetSingleDetailProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      code: item.code,
      description: item.description,
      creditAmount: 0,
      mosavab: item.mosavab,
      "textcolor-expense": item.expense < 0 ? "red" : "",
      expense: item.expense,
      percent: item.percentBud,
      edit: item.edit,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = getDataMutation.data?.data
    ? formatTableData(getDataMutation.data?.data)
    : formatTableData(data);

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    description: null,
    creditAmount: 0,
    mosavab: sumFieldsInSingleItemData(data, "mosavab"),
    edit: sumFieldsInSingleItemData(data, "edit"),
    percent: "",
    actions: "",
    expense: sumFieldsInSingleItemData(data, "expense"),
  };

  // modal
  const [isOpenMoreDetailModal, setIsOpenMoreDetailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<ReactNode>("");
  const [codingId, setCodingId] = useState(0);
  const [motherId, setMotherId] = useState(0);
  const getMoreDetailMutation = useMutation(
    proposalBudgetApi.getMoreDetailData
  );
  const handleOpenDetailModal = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => {
    const title = `${row.code} - ${row.description}`;
    setModalTitle(
      <>
        <div>{baseTitle}</div>
        <div>{title}</div>
      </>
    );

    setCodingId(row.codingId);
    setMotherId(row.id);

    getMoreDetailMutation.mutate({
      ...formData,
      [proposalConfig.coding]: row.codingId,
    });

    setIsOpenMoreDetailModal(true);
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroup}
        data={tableData}
        footer={tableFooter}
        notFixed
      />

      {/* modal 2 */}
      <FixedModal
        open={isOpenMoreDetailModal}
        handleClose={() => setIsOpenMoreDetailModal(false)}
        loading={getMoreDetailMutation.isLoading}
        title={modalTitle}
        maxWidth="md"
        maxHeight="70%"
      >
        <ProposalModal2
          data={getMoreDetailMutation.data?.data || []}
          baseTitle={modalTitle}
          formData={formData}
          modal1CodingId={codingId}
          motherId={motherId}
        />
      </FixedModal>

      {/* search modal */}
      <FixedModal
        open={isOpenInsertModal}
        handleClose={() => setIsOpenInsertModal(false)}
        maxWidth="md"
        maxHeight="70%"
        title="افزودن آیتم"
        loading={searchMutation.isLoading}
      >
        <ProposalModal1Search
          formData={formData}
          data={searchMutation.data?.data || []}
          motherid={codingId}
          onDoneTask={handleDoneActionTask}
        />
      </FixedModal>

      {/* edit modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        title="ویرایش آیتم"
        maxHeight="70%"
        maxWidth="md"
      >
        <ProposalModal1Edit
          initialData={editModalInitialData}
          onDoneTask={handleDoneActionTask}
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

export default ProposalModal1;
