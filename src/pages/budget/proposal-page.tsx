import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import ProposalBudgetForm from "components/sections/forms/budget/proposal/proposal-budget-form";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { proposalConfig } from "config/features/budget/proposal-config";
import { GetSingleProposalItemShape } from "types/data/budget/proposal-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { proposalBudgetApi } from "api/budget/proposal-api";
import FixedModal from "components/ui/modal/fixed-modal";
import ProposalDetailModal from "components/sections/forms/budget/proposal/proposal-detail-modal";
import { getBgColorBudget } from "helper/get-color-utils";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  edit: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  percent: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function BudgetProposalPage() {
  const [formData, setFormData] = useState({
    [proposalConfig.YEAR]: 32,
    [proposalConfig.AREA]: 1,
    [proposalConfig.BUDGET_METHOD]: 1,
  });

  // form heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <ProposalBudgetForm formData={formData} setFormData={setFormData} />
      ),
      colspan: 8,
    },
  ];

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
      align: "left",
      name: "description",
    },
    {
      title: "مصوب",
      align: "left",
      name: "mosavab",
      split: true,
    },
    {
      title: "اصلاح",
      align: "left",
      name: "edit",
      split: true,
    },
    {
      title: "عملکرد",
      name: "expense",
      align: "left",
      split: true,
    },
    {
      title: "جذب %",
      name: "percent",
      percent: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // detail modal
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const getDetailMutation = useMutation(proposalBudgetApi.getDetailData);
  const handleOpenDetailModal = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => {
    getDetailMutation.mutate({
      ...formData,
      [proposalConfig.coding]: row.codingId,
    });

    setIsOpenDetailModal(true);
  };

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
    unFormatData: GetSingleProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        code: item.code,
        description: item.description,
        mosavab: item.mosavab,
        edit: item.edit,
        percent: item.percentBud,
        expense: item.expense,
        bgcolor: getBgColorBudget(
          item.levelNumber,
          formData[proposalConfig.BUDGET_METHOD]
        ),
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const proposalQuery = useQuery(
    reactQueryKeys.budget.proposal.getData,
    () => proposalBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = proposalQuery.data
    ? formatTableData(proposalQuery.data?.data)
    : [];

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={tableData}
        />
      </AdminLayout>

      <FixedModal
        open={isOpenDetailModal}
        handleClose={() => setIsOpenDetailModal(false)}
      >
        <ProposalDetailModal data={getDetailMutation.data?.data || []} />
      </FixedModal>
    </>
  );
}

export default BudgetProposalPage;
