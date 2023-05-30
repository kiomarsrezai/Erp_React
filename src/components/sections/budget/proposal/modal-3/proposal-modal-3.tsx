import FixedTable from "components/data/table/fixed-table";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FixedModal from "components/ui/modal/fixed-modal";
import ProposalModal3Edit from "./proposal-modal-3-edit";
import ProposalModal3Search from "./proposal-modal-3-search";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import {
  GetSingleLevel5DetailProposalItemShape,
  GetSingleMoreDetailProposalItemShape,
} from "types/data/budget/proposal-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { proposalConfig } from "config/features/budget/proposal-config";
import { useMutation } from "@tanstack/react-query";
import { areaGeneralApi } from "api/general/area-general-api";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { globalConfig } from "config/global-config";
import { enqueueSnackbar } from "notistack";

interface TableDataItemShape {
  number: ReactNode;
  area: ReactNode;
  creditAmount: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
  edit: ReactNode;
  percent: ReactNode;
}

interface ProposalModal3Props {
  data: any[];
  formData: any;
  modal1CodingId: number;
  baseRowData: GetSingleMoreDetailProposalItemShape;
  baseTitle: ReactNode;
}
function ProposalModal3(props: ProposalModal3Props) {
  const { data, formData, modal1CodingId, baseRowData, baseTitle } = props;

  // search modal
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  const searchMutation = useMutation(areaGeneralApi.getData);

  const handleSearchClick = () => {
    searchMutation.mutate(3);
    setIsOpenSearchModal(true);
  };

  const dataMutation = useMutation(proposalBudgetApi.getLevel5DetailData);

  const handleDoneModal3Task = () => {
    dataMutation.mutate({
      [proposalConfig.YEAR]: formData[proposalConfig.YEAR],
      [proposalConfig.area_public]: formData[proposalConfig.AREA],
      [proposalConfig.coding]: modal1CodingId,
      [proposalConfig.project]: baseRowData.projectId,
      [proposalConfig.AREA]: baseRowData.areaId,
    });
    setIsOpenSearchModal(false);
    setIsOpenEditModal(false);
  };

  // heads
  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton color="primary" size="small" onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      ),
      colspan: 9,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "منطقه",
      name: "area",
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
  const [titleEditModal, setTitleEditModal] = useState<ReactNode>("");
  const [editModalInitialData, setEditModalInitialData] = useState({});
  const handleEditBtnClick = (
    row: TableDataItemShape & GetSingleLevel5DetailProposalItemShape
  ) => {
    setTitleEditModal(
      <>
        {baseTitle}
        <div>{row.area}</div>
      </>
    );
    setEditModalInitialData(row);
    setIsOpenEditModal(true);
  };

  // delete
  const [isShowConfrimDelete, setIsShowConfrimDelete] =
    useState<boolean>(false);
  const [idItemShouldDelete, setIdItemShouldDelete] = useState<number>();

  const [textDeleteModal, setTextDeleteModal] = useState("");

  const deleteMutation = useMutation(proposalBudgetApi.deleteModal3, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      handleDoneModal3Task();
      setIsShowConfrimDelete(false);
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const onConfrimDelete = () => {
    if (idItemShouldDelete) deleteMutation.mutate(idItemShouldDelete);
  };

  const onCancelDelete = () => {
    setIsShowConfrimDelete(false);
  };

  const handleDeleteBtnClick = (
    row: TableDataItemShape & GetSingleLevel5DetailProposalItemShape
  ) => {
    const deleteText = `آیا مایل به حذف  ${row.area} هستید ؟`;
    setTextDeleteModal(deleteText);
    setIdItemShouldDelete(row.id);
    setIsShowConfrimDelete(true);
  };

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleLevel5DetailProposalItemShape
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
    </>
  );

  const formatTableData = (
    unFormatData: GetSingleLevel5DetailProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      area: item.areaNameShort,
      creditAmount: 0,
      mosavab: item.mosavab,
      expense: item.expense,
      "textcolor-expense": item.expense < 0 ? "red" : "",
      percent: item.percentBud,
      edit: item.edit,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = dataMutation.data?.data
    ? formatTableData(dataMutation.data.data)
    : formatTableData(data);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    dataMutation.data?.data || data,
    "mosavab"
  );

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 2,
    area: null,
    creditAmount: 0,
    mosavab: sumMosavab,
    edit: sumFieldsInSingleItemData(dataMutation.data?.data || data, "edit"),
    percent: "",
    expense: sumFieldsInSingleItemData(
      dataMutation.data?.data || data,
      "expense"
    ),
  };

  const tableBottomFooter: TableDataItemShape | any = {
    number: "مانده",
    "colspan-number": 2,
    area: null,
    creditAmount: 0,
    mosavab: baseRowData.mosavab - sumMosavab,
    "textcolor-mosavab": baseRowData.mosavab - sumMosavab < 0 ? "red" : "blue",
    edit: "",
    percent: "",
    expense: "",
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        headGroups={tableHeadGroup}
        bottomFooter={tableBottomFooter}
        notFixed
      />

      {/* search modal */}
      <FixedModal
        open={isOpenSearchModal}
        handleClose={() => setIsOpenSearchModal(false)}
        maxWidth="sm"
        maxHeight="60%"
        title={baseTitle}
        loading={searchMutation.isLoading}
      >
        <ProposalModal3Search
          formData={formData}
          data={searchMutation.data?.data || []}
          modal1CodingId={modal1CodingId}
          projectId={baseRowData.projectId}
          onDoneTask={handleDoneModal3Task}
          rowProjectId={baseRowData.id}
        />
      </FixedModal>

      {/* edit modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        title={titleEditModal}
        maxWidth="sm"
        maxHeight="60%"
      >
        <ProposalModal3Edit
          initialData={editModalInitialData}
          onDoneTask={handleDoneModal3Task}
        />
      </FixedModal>

      {/* confrim delete */}
      <ConfrimProcessModal
        onCancel={onCancelDelete}
        onConfrim={onConfrimDelete}
        open={isShowConfrimDelete}
        title="حذف آیتم"
        text={textDeleteModal}
      />
    </>
  );
}

export default ProposalModal3;
