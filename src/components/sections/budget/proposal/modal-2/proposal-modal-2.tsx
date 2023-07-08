import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FixedModal from "components/ui/modal/fixed-modal";
import ProposalModal3 from "../modal-3/proposal-modal-3";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ProposalModal2Search from "./proposal-modal-2-search";
import ProposalModal2Edit from "./proposal-modal-2-edit";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import {
  GetSingleMoreDetailProposalItemShape,
  GetSingleProposalItemShape,
} from "types/data/budget/proposal-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { proposalConfig } from "config/features/budget/proposal-config";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { TextField, Typography } from "@mui/material";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  project_name: ReactNode;
  mosavab: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  edit: ReactNode;
  percent: ReactNode;
  areaName: ReactNode;
}

interface ProposalModal2Props {
  data: any[];
  formData: any;
  baseTitle: ReactNode;
  baseRowData: GetSingleProposalItemShape | any;
}
function ProposalModal2(props: ProposalModal2Props) {
  const { data, baseTitle, formData, baseRowData } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "منطقه",
      name: "areaName",
    },
    {
      title: "کد پروژه",
      name: "code",
    },
    {
      title: "نام پروژه",
      name: "project_name",
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
      width: "120px",
    },
  ];

  // modal search
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  const dataMutation = useMutation(proposalBudgetApi.getMoreDetailData);

  const handleDoneModal2Task = () => {
    dataMutation.mutate({
      ...formData,
      [proposalConfig.coding]: baseRowData.codingId,
    });
    setIsOpenSearchModal(false);
    setIsOpenEditModal(false);
    setActiveIdUpdate(null);
  };

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <Box>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setIsOpenSearchModal(true)}
          >
            <SearchIcon />
          </IconButton>
          <Typography variant="caption">
            اتصال پروژه و خدمات به ردیف بودجه
          </Typography>
        </Box>
      ),
      colspan: tableHeads.filter((item) => !item.hidden).length,
    },
  ];

  // modal 3
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<ReactNode>("");
  const [activeRowData, setActiveRowData] =
    useState<GetSingleMoreDetailProposalItemShape | null>(null);

  const getDetailMutation = useMutation(proposalBudgetApi.getLevel5DetailData);
  const handleOpenDetailModal = (
    row: TableDataItemShape & GetSingleMoreDetailProposalItemShape
  ) => {
    const title = `${row.areaName} - ${row.projectCode} - ${row.projectName}`;
    setModalTitle(
      <>
        {baseTitle} <div>{title}</div>
      </>
    );

    getDetailMutation.mutate({
      [proposalConfig.YEAR]: formData[proposalConfig.YEAR],
      [proposalConfig.area_public]: formData[proposalConfig.AREA],
      [proposalConfig.coding]: baseRowData.codingId,
      [proposalConfig.project]: row.projectId,
      [proposalConfig.AREA]: row.areaId,
    });

    setActiveRowData(row);

    setIsOpenDetailModal(true);
  };

  // edit modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editModalInitialData, setEditModalInitialData] = useState({});
  const handleEditBtnClick = (
    row: TableDataItemShape & GetSingleMoreDetailProposalItemShape
  ) => {
    const title = `${row.projectCode} - ${row.projectName}`;
    setModalTitle(
      <>
        {baseTitle} <div>{title}</div>
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

  const deleteMutation = useMutation(proposalBudgetApi.deleteModal2, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      handleDoneModal2Task();
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
    row: TableDataItemShape & GetSingleMoreDetailProposalItemShape
  ) => {
    const deleteText = `آیا مایل به حذف ${row.code} - ${row.project_name} هستید ؟`;
    setTextDeleteModal(deleteText);
    setIdItemShouldDelete(row.id);
    setIsShowConfrimDelete(true);
  };

  // data

  const [activeIdUpdate, setActiveIdUpdate] = useState<null | number>(null);
  const [editMosavab, setEditMosavab] = useState(0);
  const [editProjectEdit, setEditProjectEdit] = useState(0);

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

  const renderEditDepartman = (row: any) => {
    if (row.id === activeIdUpdate) {
      return (
        <TextField
          id="edit-input"
          label=""
          variant="outlined"
          type="number"
          size="small"
          value={editProjectEdit}
          onChange={(e) => setEditProjectEdit(+e.target.value)}
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
      return row.editProject;
    }
  };

  const openEditRowInline = (row: GetSingleMoreDetailProposalItemShape) => {
    setEditMosavab(row.mosavab);
    setEditProjectEdit(row.editProject);
    setActiveIdUpdate(row.id);
  };

  const editMutation = useMutation(proposalBudgetApi.editModal2, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      handleDoneModal2Task();
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const onSubmitEditFunctionality = () => {
    // editMutation.mutate({
    //   mosavabPublic: editMosavab,
    //   [proposalConfig.ID]: activeIdUpdate,
    // });

    editMutation.mutate({
      mosavab: editMosavab,
      editProject: editProjectEdit,
      id: activeIdUpdate,
    });
  };

  const actionButtons = (
    row: TableDataItemShape & GetSingleMoreDetailProposalItemShape
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

  const formatTableData = (
    unFormatData: GetSingleMoreDetailProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        code: item.projectCode,
        creditAmount: 0,
        project_name: item.projectName,
        mosavab: () => renderMosavabDepartman(item),
        edit: () => renderEditDepartman(item),
        expense: item.expense,
        "textcolor-expense": item.expense < 0 ? "red" : "",
        percent: item.percentBud,
        actions: actionButtons,
      })
    );

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

  const sumEditPublic = sumFieldsInSingleItemData(
    dataMutation.data?.data || data,
    "editProject"
  );

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    code: null,
    areaName: null,
    project_name: null,
    mosavab: sumMosavab,
    creditAmount: 0,
    edit: sumEditPublic,
    percent: "",
    expense: sumFieldsInSingleItemData(
      dataMutation.data?.data || data,
      "expense"
    ),
    actions: "",
  };

  const tableBottomFooter: TableDataItemShape | any = {
    number: "مانده",
    "colspan-number": 4,
    code: null,
    areaName: null,
    project_name: null,
    mosavab: baseRowData.mosavab() - sumMosavab,
    "textcolor-mosavab":
      baseRowData.mosavab() - sumMosavab < 0 ? "red" : "blue",
    creditAmount: "",
    edit: baseRowData.editPublic - sumEditPublic,
    "textcolor-edit":
      baseRowData.editPublic - sumEditPublic < 0 ? "red" : "blue",
    percent: "",
    expense: "",
    actions: "",
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

      {/* modal 3 */}
      <FixedModal
        open={isOpenDetailModal}
        handleClose={() => setIsOpenDetailModal(false)}
        title={modalTitle}
        loading={getDetailMutation.isLoading}
        maxHeight="70%"
        maxWidth="50%"
      >
        <ProposalModal3
          data={getDetailMutation.data?.data || []}
          formData={formData}
          modal1CodingId={baseRowData.codingId}
          baseRowData={activeRowData as GetSingleMoreDetailProposalItemShape}
          baseTitle={modalTitle}
        />
      </FixedModal>

      {/* search modal */}
      <FixedModal
        open={isOpenSearchModal}
        handleClose={() => setIsOpenSearchModal(false)}
        maxWidth="sm"
        maxHeight="80%"
        title={baseTitle}
      >
        <ProposalModal2Search
          formData={formData}
          codingId={baseRowData.id}
          onDoneTask={handleDoneModal2Task}
        />
      </FixedModal>

      {/* edit modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        title={modalTitle}
        maxHeight="80%"
        maxWidth="sm"
      >
        <ProposalModal2Edit
          initialData={editModalInitialData}
          onDoneTask={handleDoneModal2Task}
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

export default ProposalModal2;
