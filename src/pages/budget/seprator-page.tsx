import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import SepratoeBudgetForm from "components/sections/forms/budget/seprator-budget-form";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import IconButton from "@mui/material/IconButton";

import { TableHeadShape } from "types/table-type";
import { useQuery } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode } from "react";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import useCommonFormFieldsSTore from "hooks/store/common-form-fields";

interface TableDataItemShape {
  id: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  percentBud: ReactNode;
  actions: ReactNode;
}

function BudgetSepratorPage() {
  // heads
  const methodTypeSpratorbudget = useCommonFormFieldsSTore(
    (state) => state.methodTypeSpratorbudget
  );

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
      align: "left",
      hidden: methodTypeSpratorbudget === 1,
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
      title: <SepratoeBudgetForm />,
      colspan: 8,
    },
  ];

  // data
  const actionButtons = (
    <IconButton color="primary" size="small">
      <CreditCardIcon />
    </IconButton>
  );
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
    actions: "",
  };

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        headGroups={tableHeadGroup}
        footer={tableFooter}
      />
    </AdminLayout>
  );
}

export default BudgetSepratorPage;
