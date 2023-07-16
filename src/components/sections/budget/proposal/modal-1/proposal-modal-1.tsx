import FixedTable from "components/data/table/fixed-table";
import FixedModal from "components/ui/modal/fixed-modal";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ProposalModal1Search from "./proposal-modal-1-search";
import ProposalModal2 from "../modal-2/proposal-modal-2";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import ProposalModal1Edit from "./proposal-modal-1-edit";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { proposalConfig } from "config/features/budget/proposal-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import {
  GetSingleDetailProposalItemShape,
  GetSingleProposalItemShape,
} from "types/data/budget/proposal-type";
import { TextField } from "@mui/material";
import { AmdDependency } from "typescript";
import { reactQueryKeys } from "config/react-query-keys-config";

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
  baseRowData: GetSingleProposalItemShape;
  setIsmodal1Changed: (state: any) => void;
}
function ProposalModal1(props: ProposalModal1Props) {
  const { data, baseTitle, formData, baseRowData, setIsmodal1Changed } = props;

  // data
  const queryClient = useQueryClient();
  const getDataMutation = useMutation(proposalBudgetApi.getDetailData, {
    onSuccess(data) {
      queryClient?.setQueryData(reactQueryKeys.budget.proposal.getModal1Data, {
        data: data.data,
      });
    },
  });

  const handleDoneActionTask = () => {
    getDataMutation.mutate({
      ...formData,
      [proposalConfig.coding]: baseRowData.codingId,
    });
    setIsmodal1Changed(true);
    setIsOpenInsertModal(false);
    setIsOpenEditModal(false);
    setActiveIdUpdate(null);
  };

  // search modal
  const [isOpenInsertModal, setIsOpenInsertModal] = useState(false);

  const searchMutation = useMutation(proposalBudgetApi.getSearchModal1Data);

  const handleAddClick = () => {
    searchMutation.mutate({
      ...formData,
      [proposalConfig.motherid]: baseRowData.codingId,
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
      width: "150px",
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
      width: "150px",
    },
    {
      title: "اصلاح",
      name: "edit",
      align: "left",
      split: true,
      width: "150px",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[proposalConfig.BUDGET_METHOD] === 1,
      width: "150px",
    },
    {
      title: "هزینه",
      name: "expense",
      align: "left",
      split: true,
      width: "150px",
    },
    {
      title: "% جذب",
      name: "percent",
      percent: true,
    },
    {
      title: "عملیات",
      name: "actions",
      width: "120px",
    },
  ];

  // eidt modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editModalInitialData, setEditModalInitialData] = useState({});
  const handleEditBtnClick = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => {
    const title = `${row.code} - ${row.description}`;
    setModalTitle(
      <>
        <div>{baseTitle}</div>
        <div>{title}</div>
      </>
    );
    setEditModalInitialData(row);
    setIsOpenEditModal(true);
  };

  // delete item
  const [isShowConfrimDelete, setIsShowConfrimDelete] =
    useState<boolean>(false);
  const [idItemShouldDelete, setIdItemShouldDelete] = useState<number>();

  const [textDeleteModal, setTextDeleteModal] = useState("");

  const deleteMutation = useMutation(proposalBudgetApi.deleteModal1, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      handleDoneActionTask();
      setIsOpenEditModal(false);
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
    row: (TableDataItemShape & GetSingleProposalItemShape) | any
  ) => {
    const deleteText = `آیا مایل به حذف ${row.code()} - ${
      row.description
    } هستید ؟`;
    setTextDeleteModal(deleteText);
    setIdItemShouldDelete(row.id);
    setIsShowConfrimDelete(true);
  };

  // data
  const editMutation = useMutation(proposalBudgetApi.editModal1, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      handleDoneActionTask();
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const [activeIdUpdate, setActiveIdUpdate] = useState<null | number>(null);
  const [activeRowUpdate, setActiveRowUpdate] =
    useState<null | GetSingleProposalItemShape>(null);
  const [editMosavab, setEditMosavab] = useState(0);
  const [editCode, setEditCode] = useState("0");
  const [editOldCode, setEditOldCode] = useState("0");
  const [editDescription, setEditDescription] = useState("");

  const onSubmitEditFunctionality = () => {
    editMutation.mutate({
      mosavabPublic: editMosavab,
      [proposalConfig.ID]: activeIdUpdate,
      codeOld: editOldCode,
      codeNew: editCode,
      description: editDescription,
    });
  };

  const openEditRowInline = (row: GetSingleProposalItemShape) => {
    setEditMosavab(row.mosavab);
    setEditCode(row.code);
    setEditOldCode(row.code);
    setEditDescription(row.description);
    setActiveRowUpdate(row);
    setActiveIdUpdate(row.id);
  };

  const actionButtons = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => (
    <Box display={"flex"} justifyContent={"center"}>
      {activeIdUpdate !== row.id ? (
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
            onClick={() => openEditRowInline(row)}
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
      ) : (
        <>
          <IconButton
            color="success"
            size="small"
            onClick={onSubmitEditFunctionality}
          >
            <CheckIcon />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={() => setActiveIdUpdate(null)}
          >
            <CloseIcon />
          </IconButton>
        </>
      )}
    </Box>
  );

  const renderMosavabDepartman = (row: any) => {
    if (row.id === activeIdUpdate) {
      return (
        <TextField
          id="code-input"
          label=""
          variant="outlined"
          type="number"
          size="small"
          value={editMosavab}
          onChange={(e) => setEditMosavab(+e.target.value)}
          autoComplete="off"
          inputProps={{
            sx: {
              height: "17px",
            },
          }}
          fullWidth
        />
      );
    } else {
      return row.mosavab;
    }
  };

  const renderCodeDepartman = (row: any) => {
    if (row.id === activeIdUpdate) {
      return (
        <TextField
          id="code-input"
          label=""
          variant="outlined"
          type="number"
          size="small"
          value={editCode}
          onChange={(e) => setEditCode(e.target.value)}
          autoComplete="off"
          inputProps={{
            sx: {
              height: "17px",
            },
          }}
          fullWidth
        />
      );
    } else {
      return row.code;
    }
  };

  const renderDesciption = (row: any) => {
    if (row.id === activeIdUpdate) {
      return (
        <TextField
          id="description-input"
          multiline
          label=""
          variant="outlined"
          type="number"
          size="small"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          autoComplete="off"
          inputProps={{
            sx: {
              height: "17px",
            },
          }}
          fullWidth
        />
      );
    } else {
      return row.description;
    }
  };

  const formatTableData = (
    unFormatData: GetSingleDetailProposalItemShape[] | any
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item: any, i: any) => ({
        ...item,
        number: i + 1,
        code: () => renderCodeDepartman(item),
        description: () => renderDesciption(item),
        creditAmount: 0,
        mosavab: () => renderMosavabDepartman(item),
        "textcolor-expense": item.expense < 0 ? "red" : "",
        expense: item.expense,
        percent: item.percentBud,
        edit: item.editPublic,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const modal1DataQuery = useQuery(
    reactQueryKeys.budget.proposal.getModal1Data,
    () => proposalBudgetApi.getDetailData({}),
    {
      enabled: false,
    }
  );

  const tableData = formatTableData(modal1DataQuery.data?.data || data);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    getDataMutation.data?.data || data,
    "mosavab"
  );

  const sumEditPublic = sumFieldsInSingleItemData(
    getDataMutation.data?.data || data,
    "editPublic"
  );
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    description: null,
    creditAmount: "",
    mosavab: sumMosavab,
    edit: sumEditPublic,
    percent: "",
    actions: "",
    expense: "",
  };

  const tableBottomFooter: TableDataItemShape | any = {
    number: "مانده",
    "colspan-number": 3,
    code: null,
    description: null,
    creditAmount: "",
    mosavab: baseRowData.mosavab - sumMosavab,
    "textcolor-mosavab": baseRowData.mosavab - sumMosavab < 0 ? "red" : "blue",
    edit: baseRowData.edit - sumEditPublic,
    "textcolor-edit": baseRowData.edit - sumEditPublic < 0 ? "red" : "blue",
    percent: "",
    actions: "",
    expense: "",
  };

  // modal
  const [isOpenMoreDetailModal, setIsOpenMoreDetailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<ReactNode>("");
  const [activeRowData, setActiveRowData] =
    useState<GetSingleProposalItemShape | null>(null);

  const getMoreDetailMutation = useMutation(
    proposalBudgetApi.getMoreDetailData
  );
  const handleOpenDetailModal = (row: any) => {
    const title = `${row.code(row)} - ${row.description(row)}`;
    setModalTitle(
      <>
        <div>{baseTitle}</div>
        <div>{title}</div>
      </>
    );

    setActiveRowData(row);

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
        bottomFooter={tableBottomFooter}
        notFixed
      />

      {/* modal 2 */}
      <FixedModal
        open={isOpenMoreDetailModal}
        handleClose={() => setIsOpenMoreDetailModal(false)}
        loading={getMoreDetailMutation.isLoading}
        title={modalTitle}
        maxWidth="70%"
        maxHeight="75%"
      >
        <ProposalModal2
          data={getMoreDetailMutation.data?.data || []}
          baseTitle={modalTitle}
          formData={formData}
          baseRowData={activeRowData as GetSingleProposalItemShape}
        />
      </FixedModal>

      {/* search modal */}
      <FixedModal
        open={isOpenInsertModal}
        handleClose={() => setIsOpenInsertModal(false)}
        maxWidth="md"
        maxHeight="70%"
        title={baseTitle}
        loading={searchMutation.isLoading}
      >
        <ProposalModal1Search
          formData={formData}
          data={searchMutation.data?.data || []}
          onDoneTask={handleDoneActionTask}
        />
      </FixedModal>

      {/* edit modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        title={modalTitle}
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
        text={textDeleteModal}
      />
    </>
  );
}

export default ProposalModal1;
