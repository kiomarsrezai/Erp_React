import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import ProposalBudgetForm from "components/sections/budget/proposal/proposal-budget-form";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { proposalConfig } from "config/features/budget/proposal-config";
import { GetSingleProposalItemShape } from "types/data/budget/proposal-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { getBgColorBudget } from "helper/get-color-utils";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import ProposalModal1 from "components/sections/budget/proposal/modal-1/proposal-modal-1";

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
    [proposalConfig.YEAR]: undefined,
    [proposalConfig.AREA]: undefined,
    [proposalConfig.BUDGET_METHOD]: undefined,
  });

  // form heads

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

  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <ProposalBudgetForm formData={formData} setFormData={setFormData} />
      ),
      colspan: tableHeads.filter((item) => !item.hidden).length,
    },
  ];

  // detail modal
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const getDetailMutation = useMutation(proposalBudgetApi.getDetailData);

  const handleOpenDetailModal = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => {
    const title = `${row.code} - ${row.description}`;
    setModalTitle(title);

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
        creditAmount: 0,
        percent: item.percentBud,
        expense: item.expense,
        "textcolor-expense": item.expense < 0 ? "red" : "",
        bgcolor: getBgColorBudget(
          item.levelNumber,
          formData[proposalConfig.BUDGET_METHOD] || 0
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

  // footer
  const footerMosavabSum = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "mosavab",
    (item: GetSingleProposalItemShape) => item.levelNumber === 1
  );

  const footerEditSum = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "edit",
    (item: GetSingleProposalItemShape) => item.levelNumber === 1
  );

  const footerExpenseSum = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "expense",
    (item: GetSingleProposalItemShape) => item.levelNumber === 1
  );

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    "rowspan-number": 2,
    code: null,
    description: null,
    mosavab: footerMosavabSum,
    edit: footerEditSum,
    creditAmount: 0,
    expense: footerExpenseSum,
    percent: "",
    actions: "",
  };

  const tableBottomFooter: TableDataItemShape | any = {
    number: null,
    code: null,
    description: null,
    mosavab: `${getPercent(footerExpenseSum, footerMosavabSum)}%`,
    creditAmount: 0,
    "align-mosavab": "center",
    edit: `${getPercent(footerExpenseSum, footerEditSum)}%`,
    "align-edit": "center",
    expense: "",
    percent: "",
    actions: "",
  };

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={tableData}
          footer={tableFooter}
          bottomFooter={tableBottomFooter}
        />
      </AdminLayout>

      <FixedModal
        open={isOpenDetailModal}
        handleClose={() => setIsOpenDetailModal(false)}
        loading={getDetailMutation.isLoading}
        title={modalTitle}
      >
        <ProposalModal1
          data={getDetailMutation.data?.data || []}
          baseTitle={modalTitle}
          formData={formData}
        />
      </FixedModal>
    </>
  );
}

export default BudgetProposalPage;
