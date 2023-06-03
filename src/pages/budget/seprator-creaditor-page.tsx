import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import SepratorCreaditorBudgetForm from "components/sections/budget/seprator-creaditor/seprator-creaditor-budget-form";
import SepratorCreaditModal from "components/sections/budget/seprator-creaditor/seprator-creadit-modal";

import { TableHeadShape } from "types/table-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode, useState } from "react";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { getBgColorBudget } from "helper/get-color-utils";
import { formatExpenseName } from "helper/data-utils";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  edit: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  percentBud: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function BudgetSepratorCreaditorPage() {
  // forms
  const [formData, setFormData] = useState({
    [sepratorCreaditorBudgetConfig.YEAR]: undefined,
    [sepratorCreaditorBudgetConfig.AREA]: undefined,
    [sepratorCreaditorBudgetConfig.BUDGET_METHOD]: undefined,
  });

  // heads
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
      split: true,
      align: "left",
    },
    {
      title: "اصلاح بودجه",
      name: "edit",
      split: true,
      align: "left",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[sepratorBudgetConfig.BUDGET_METHOD] === 1,
    },
    {
      title: formatExpenseName(formData[sepratorBudgetConfig.BUDGET_METHOD]),
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
        <SepratorCreaditorBudgetForm
          formData={formData}
          setFormData={setFormData}
        />
      ),
      colspan: tableHeads.filter((item) => !item.hidden).length,
    },
  ];

  // modal creadit
  const sepratorProjectMutation = useMutation(sepratorBudgetApi.areaProject);
  const [activeInitialData, setActiveInitialData] = useState<null | any>(null);
  const [isOpenCreaditModal, setIsOpenCreaditModal] = useState(false);
  const [detailModalTitle, setDetailModalTitle] = useState("");

  const handleClickCraditModal = (row: any) => {
    setActiveInitialData(row);
    setDetailModalTitle(`${row.code} - ${row.description}`);
    setIsOpenCreaditModal(true);
  };

  // actions
  const actionButtons = (row: TableDataItemShape | any) => (
    <Box display={"flex"} justifyContent={"center"}>
      {row.levelNumber !== 0 && (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleClickCraditModal(row)}
        >
          <PersonIcon />
        </IconButton>
      )}
    </Box>
  );

  const formatTableData = (
    unFormatData: GetSingleSepratorItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        code: item.code,
        description: item.description,
        mosavab: item.mosavab,
        edit: item.edit,
        creditAmount: item.creditAmount,
        expense: item.expense,
        "textcolor-expense": item.expense < 0 ? "red" : "",
        percentBud: item.percentBud,
        actions: actionButtons,
        bgcolor:
          item.levelNumber !== 0
            ? "rgb(255,255,153,var(--hover-color))"
            : "#fff",

        "bgcolor-creditAmount": item.creditAmount > item.mosavab && "#d7a2a2",
        "bgcolor-expense": item.expense > item.mosavab && "#d7a2a2",
      })
    );

    return formatedData;
  };

  const sepratorQuery = useQuery(
    reactQueryKeys.budget.sepratorCreaditor.getData,
    () => sepratorBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = sepratorQuery.data
    ? formatTableData(sepratorQuery.data?.data)
    : [];

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "mosavab",
    (item: GetSingleSepratorItemShape) => item.levelNumber === 1
  );

  const sumCreditAmount = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "creditAmount",
    (item: GetSingleSepratorItemShape) => item.levelNumber === 1
  );

  const sumExpense = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "expense",
    (item: GetSingleSepratorItemShape) => item.levelNumber === 1
  );

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-id": 3,
    "rowspan-id": 2,
    code: null,
    description: null,
    mosavab: sumMosavab,
    edit: sumFieldsInSingleItemData(
      sepratorQuery.data?.data,
      "edit",
      (item: GetSingleSepratorItemShape) => item.levelNumber === 1
    ),
    creditAmount: sumCreditAmount,
    expense: sumExpense,
    percentBud: "",
    actions: () => "",
  };

  const tableBottomFooter: TableDataItemShape | any = {
    number: null,
    code: null,
    description: null,
    mosavab: "-",
    edit: "-",
    creditAmount: `${getPercent(sumCreditAmount, sumMosavab)}%`,
    expense: `${getPercent(sumExpense, sumMosavab)}%`,
    "align-creditAmount": "center",
    "align-expense": "center",
    percentBud: "",
    actions: () => "",
  };

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        headGroups={tableHeadGroup}
        footer={tableFooter}
        bottomFooter={tableBottomFooter}
      />

      {/* creadit modal */}
      <FixedModal
        open={isOpenCreaditModal}
        handleClose={() => setIsOpenCreaditModal(false)}
        title={detailModalTitle}
        loading={sepratorProjectMutation.isLoading}
        maxWidth="md"
      >
        <SepratorCreaditModal
          initialData={activeInitialData as any}
          onDoneTask={() => {}}
        />
      </FixedModal>
    </AdminLayout>
  );
}

export default BudgetSepratorCreaditorPage;
