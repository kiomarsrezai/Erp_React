import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import SepratoeBudgetForm from "components/sections/forms/budget/seprator-budget-form";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import IconButton from "@mui/material/IconButton";

import { TableHeadShape } from "types/table-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode, useState } from "react";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import FixedModal from "components/ui/modal/fixed-modal";
import SepratorDetailModal from "components/sections/forms/budget/seprator-detail-modal";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";

interface TableDataItemShape {
  id: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  percentBud: ReactNode;
  actions: (row: TableDataItemShape) => ReactNode;
}

function BudgetSepratorPage() {
  // forms
  const [formData, setFormData] = useState({
    [sepratorBudgetConfig.YEAR]: 32,
    [sepratorBudgetConfig.AREA]: 1,
    [sepratorBudgetConfig.BUDGET_METHOD]: 1,
  });

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "id",
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
      split: true,
      align: "left",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      hidden: formData[sepratorBudgetConfig.BUDGET_METHOD] === 1,
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
    },
    {
      title: "% جذب",
      name: "percentBud",
      percent: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  const tableHeadGroup = [
    {
      title: (
        <SepratoeBudgetForm formData={formData} setFormData={setFormData} />
      ),
      colspan: 8,
    },
  ];

  // data
  const handleClickDetailIcon = (row: TableDataItemShape) => {
    setDetailModalTitle(`${row.code} - ${row.description}`);
    handleOpenDetailModal();
  };

  const actionButtons = (row: TableDataItemShape) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickDetailIcon(row)}
    >
      <CreditCardIcon />
    </IconButton>
  );

  const getBgColor = (id: number) => {
    if (id === 1) {
      return "rgb(248,203,173)";
    }

    if (id === 2) {
      return "rgb(198,224,180)";
    }

    if (id === 3) {
      return "rgb(189,215,238)";
    }

    if (id === 4) {
      return "rgb(255,255,153)";
    }

    if (id === 5) {
      return "#fff";
    }
  };
  const formatTableData = (
    unFormatData: GetSingleSepratorItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      id: i + 1,
      code: item.code,
      description: item.description,
      mosavab: item.mosavab,
      creditAmount: item.creditAmount,
      expense: item.expense,
      percentBud: item.percentBud,
      actions: actionButtons,
      bgcolor: getBgColor(item.levelNumber),

      "bgcolor-creditAmount": item.creditAmount > item.mosavab && "#d7a2a2",
      "bgcolor-expense": item.expense > item.mosavab && "#d7a2a2",
    }));

    return formatedData;
  };

  const sepratorQuery = useQuery(
    reactQueryKeys.budget.seprator.getData,
    () => sepratorBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = sepratorQuery.data
    ? formatTableData(sepratorQuery.data?.data)
    : [];

  // footer
  const tableFooter: TableDataItemShape = {
    id: "جمع",
    code: "",
    description: "",
    mosavab: sumFieldsInSingleItemData(sepratorQuery.data?.data, "mosavab"),
    creditAmount: sumFieldsInSingleItemData(
      sepratorQuery.data?.data,
      "creditAmount"
    ),
    expense: sumFieldsInSingleItemData(sepratorQuery.data?.data, "expense"),
    percentBud: "",
    actions: () => "",
  };

  // modal
  const [detailModal, setDetailModal] = useState(false);
  const [detailModalTitle, setDetailModalTitle] = useState("");
  const handleOpenDetailModal = () => {
    setDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModal(false);
  };

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        headGroups={tableHeadGroup}
        footer={tableFooter}
      />

      <FixedModal
        open={detailModal}
        handleClose={handleCloseDetailModal}
        title={detailModalTitle}
      >
        <SepratorDetailModal title={detailModalTitle} formdata={formData} />
      </FixedModal>
    </AdminLayout>
  );
}

export default BudgetSepratorPage;
