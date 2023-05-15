import FixedTable from "components/data/table/fixed-table";
import ProposalMoreDetailModal from "./proposal-more-detail-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { useMutation } from "@tanstack/react-query";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { proposalConfig } from "config/features/budget/proposal-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import {
  GetSingleDetailProposalItemShape,
  GetSingleProposalItemShape,
} from "types/data/budget/proposal-type";

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

interface ProposalDetailModalProps {
  data: any[];
  baseTitle: string;
  formData: any;
}
function ProposalDetailModal(props: ProposalDetailModalProps) {
  const { data, baseTitle, formData } = props;

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

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleProposalItemShape
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

  const tableData = data ? formatTableData(data) : [];

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
        data={tableData}
        footer={tableFooter}
        notFixed
      />

      <FixedModal
        open={isOpenMoreDetailModal}
        handleClose={() => setIsOpenMoreDetailModal(false)}
        loading={getMoreDetailMutation.isLoading}
        title={modalTitle}
        maxWidth="md"
        maxHeight="70%"
      >
        <ProposalMoreDetailModal
          data={getMoreDetailMutation.data?.data || []}
          baseTitle={modalTitle}
          formData={formData}
          codingId={codingId}
        />
      </FixedModal>
    </>
  );
}

export default ProposalDetailModal;
