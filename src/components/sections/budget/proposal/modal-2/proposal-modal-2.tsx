import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FixedModal from "components/ui/modal/fixed-modal";
import ProposalModal3 from "../proposal-modal-3";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ProposalModal2Search from "./proposal-modal-2-search";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleMoreDetailProposalItemShape } from "types/data/budget/proposal-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { proposalConfig } from "config/features/budget/proposal-config";
import { useMutation } from "@tanstack/react-query";
import ProposalModal2Edit from "./proposal-modal-2-edit";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  project_name: ReactNode;
  mosavab: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  edit: ReactNode;
  percent: ReactNode;
}

interface ProposalModal2Props {
  data: any[];
  formData: any;
  baseTitle: ReactNode;
  codingId: number;
}
function ProposalModal2(props: ProposalModal2Props) {
  const { data, baseTitle, formData, codingId } = props;

  // heads

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
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

  // modal search
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton
          color="primary"
          size="small"
          onClick={() => setIsOpenSearchModal(true)}
        >
          <SearchIcon />
        </IconButton>
      ),
      colspan: 8,
    },
  ];

  // modal 3
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<ReactNode>("");

  const getDetailMutation = useMutation(proposalBudgetApi.getLevel5DetailData);
  const handleOpenDetailModal = (
    row: TableDataItemShape & GetSingleMoreDetailProposalItemShape
  ) => {
    const title = `${row.projectCode} - ${row.projectName}`;
    setModalTitle(
      <>
        {baseTitle} <div>{title}</div>
      </>
    );

    getDetailMutation.mutate({
      ...formData,
      [proposalConfig.coding]: codingId,
      [proposalConfig.project]: row.projectId,
    });

    setIsOpenDetailModal(true);
  };

  // edit modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editModalInitialData, setEditModalInitialData] = useState({});
  const handleEditBtnClick = (
    row: TableDataItemShape & GetSingleMoreDetailProposalItemShape
  ) => {
    setEditModalInitialData(row);
    setIsOpenEditModal(true);
  };

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleMoreDetailProposalItemShape
  ) => (
    <>
      <IconButton size="small" color="error" onClick={() => {}}>
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
    unFormatData: GetSingleMoreDetailProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      code: item.projectCode,
      creditAmount: 0,
      project_name: item.projectName,
      mosavab: item.mosavab,
      expense: item.expense,
      "textcolor-expense": item.expense < 0 ? "red" : "",
      percent: item.percentBud,
      edit: item.edit,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    project_name: null,
    mosavab: sumFieldsInSingleItemData(data, "mosavab"),
    creditAmount: 0,
    edit: sumFieldsInSingleItemData(data, "edit"),
    percent: "",
    expense: sumFieldsInSingleItemData(data, "expense"),
    actions: "",
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

      <FixedModal
        open={isOpenDetailModal}
        handleClose={() => setIsOpenDetailModal(false)}
        title={modalTitle}
        loading={getDetailMutation.isLoading}
        maxHeight="80%"
        maxWidth="sm"
      >
        <ProposalModal3
          data={getDetailMutation.data?.data || []}
          formData={formData}
        />
      </FixedModal>

      {/* search modal */}
      <FixedModal
        open={isOpenSearchModal}
        handleClose={() => setIsOpenSearchModal(false)}
        maxWidth="sm"
        maxHeight="80%"
        title="افزودن آیتم"
      >
        <ProposalModal2Search formData={formData} />
      </FixedModal>

      {/* edit modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        title="ویرایش آیتم"
        maxHeight="80%"
        maxWidth="sm"
      >
        <ProposalModal2Edit initialData={editModalInitialData} />
      </FixedModal>
    </>
  );
}

export default ProposalModal2;
