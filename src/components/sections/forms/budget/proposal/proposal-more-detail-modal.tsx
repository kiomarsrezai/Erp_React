import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleMoreDetailProposalItemShape } from "types/data/budget/proposal-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import FixedModal from "components/ui/modal/fixed-modal";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { proposalConfig } from "config/features/budget/proposal-config";
import { useMutation } from "@tanstack/react-query";
import ProposalLevel5DetailModal from "./proposal-level5-detail-modal";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  project_name: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
  edit: ReactNode;
  percent: ReactNode;
}

interface ProposalMoreDetailModalProps {
  data: any[];
}
function ProposalMoreDetailModal(props: ProposalMoreDetailModalProps) {
  const { data } = props;

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
      title: "عملکرد",
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

  // modal
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const getDetailMutation = useMutation(proposalBudgetApi.getLevel5DetailData);
  const handleOpenDetailModal = (
    row: TableDataItemShape & GetSingleMoreDetailProposalItemShape
  ) => {
    const title = `${row.projectCode} - ${row.projectName}`;
    setModalTitle(title);

    getDetailMutation.mutate({
      [proposalConfig.ID]: row.id,
    });

    setIsOpenDetailModal(true);
  };

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleMoreDetailProposalItemShape
  ) => (
    <IconButton
      size="small"
      color="primary"
      onClick={() => handleOpenDetailModal(row)}
    >
      <FormatListBulletedIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleMoreDetailProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      code: item.projectCode,
      project_name: item.projectName,
      mosavab: item.mosavab,
      expense: item.expense,
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
    edit: sumFieldsInSingleItemData(data, "edit"),
    percent: "",
    expense: sumFieldsInSingleItemData(data, "expense"),
    actions: "",
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        notFixed
      />

      <FixedModal
        open={isOpenDetailModal}
        handleClose={() => setIsOpenDetailModal(false)}
        title={modalTitle}
        loading={getDetailMutation.isLoading}
      >
        <ProposalLevel5DetailModal data={getDetailMutation.data?.data || []} />
      </FixedModal>
    </>
  );
}

export default ProposalMoreDetailModal;
