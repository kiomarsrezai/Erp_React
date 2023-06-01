import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FixedModal from "components/ui/modal/fixed-modal";
import SepratoeBudgetForm from "components/sections/budget/seprator/seprator-budget-form";
import SepratorModal1 from "components/sections/budget/seprator/seprator-modal-1";
import Box from "@mui/material/Box";
import SepratorAccModal from "components/sections/budget/seprator/acc/seprator-acc-modal";
import SepratorProjectModal1 from "components/sections/budget/seprator/project/seprator-project-modal-1";

import { TableHeadShape } from "types/table-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode, useState } from "react";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { getBgColorBudget } from "helper/get-color-utils";
import { formatExpenseName } from "helper/data-utils";

interface TableDataItemShape {
  id: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  edit: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  percentBud: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function BudgetSepratorPage() {
  // forms
  const [formData, setFormData] = useState({
    [sepratorBudgetConfig.YEAR]: undefined,
    [sepratorBudgetConfig.AREA]: undefined,
    [sepratorBudgetConfig.BUDGET_METHOD]: undefined,
  });

  const [codingId, setCodingId] = useState(0);

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
        <SepratoeBudgetForm formData={formData} setFormData={setFormData} />
      ),
      colspan: tableHeads.filter((item) => !item.hidden).length,
    },
  ];

  // data
  const sepratorDetailDataQuery = useQuery(
    reactQueryKeys.report.proctor.getDetailData,
    () => sepratorBudgetApi.getDetail({}),
    {
      enabled: false,
    }
  );

  const queryClient = useQueryClient();

  const sepratorDetailMutation = useMutation(sepratorBudgetApi.getDetail, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        reactQueryKeys.report.proctor.getDetailData,
        data
      );
    },
  });

  const handleClickDetailIcon = (row: any) => {
    sepratorDetailMutation.mutate({
      ...formData,
      [sepratorBudgetConfig.CODING]: row[sepratorBudgetConfig.CODING],
    });
    setCodingId(row[sepratorBudgetConfig.CODING]);

    setDetailModalTitle(`${row.code} - ${row.description}`);
    handleOpenDetailModal();
  };

  // modal acc
  const sepratorAccMutation = useMutation(sepratorBudgetApi.areaAcc);
  const [isOpenAccModal, setIsOpenAccModal] = useState(false);

  const handleClickAccModal = (row: any) => {
    sepratorAccMutation.mutate({
      ...formData,
      [sepratorBudgetConfig.CODING]: row[sepratorBudgetConfig.CODING],
    });
    setDetailModalTitle(`${row.code} - ${row.description}`);
    setIsOpenAccModal(true);
  };

  // modal project
  const sepratorProjectMutation = useMutation(sepratorBudgetApi.areaProject);
  const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);

  const handleClickProjectModal = (row: any) => {
    sepratorProjectMutation.mutate({
      ...formData,
      [sepratorBudgetConfig.CODING]: row[sepratorBudgetConfig.CODING],
    });
    setCodingId(row[sepratorBudgetConfig.CODING]);
    setDetailModalTitle(`${row.code} - ${row.description}`);
    setIsOpenProjectModal(true);
  };

  // actions
  const actionButtons = (row: TableDataItemShape | any) => (
    <Box display={"flex"} justifyContent={"center"}>
      {[2, 3, 4, 5].includes(
        formData[sepratorBudgetConfig.BUDGET_METHOD] as any
      ) &&
        row.crud && (
          <>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => handleClickProjectModal(row)}
              sx={{ fontSize: 10, minWidth: "15px" }}
            >
              p
            </Button>

            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleClickAccModal(row)}
              sx={{ fontSize: 10, minWidth: "15px", ml: 1 }}
            >
              acc
            </Button>
          </>
        )}

      {formData[sepratorBudgetConfig.BUDGET_METHOD] === 3 && row.crud && (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleClickDetailIcon(row)}
        >
          <CreditCardIcon />
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
        id: i + 1,
        code: item.code,
        description: item.description,
        mosavab: item.mosavab,
        edit: item.edit,
        creditAmount: item.creditAmount,
        expense: item.expense,
        "textcolor-expense": item.expense < 0 ? "red" : "",
        percentBud: item.percentBud,
        actions: actionButtons,
        bgcolor: getBgColorBudget(
          item.levelNumber,
          formData[sepratorBudgetConfig.BUDGET_METHOD] || 0
        ),

        "bgcolor-creditAmount": item.creditAmount > item.mosavab && "#d7a2a2",
        "bgcolor-expense": item.expense > item.mosavab && "#d7a2a2",
      })
    );

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
    id: "جمع",
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
    id: null,
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
        bottomFooter={tableBottomFooter}
      />

      {/* tamin modal */}
      <FixedModal
        open={detailModal}
        handleClose={handleCloseDetailModal}
        title={detailModalTitle}
        loading={sepratorDetailMutation.isLoading}
      >
        <SepratorModal1
          title={detailModalTitle}
          formdata={formData}
          coding={codingId}
          data={sepratorDetailDataQuery.data?.data || []}
        />
      </FixedModal>

      {/* acc modal */}
      <FixedModal
        open={isOpenAccModal}
        handleClose={() => setIsOpenAccModal(false)}
        title={detailModalTitle}
        loading={sepratorAccMutation.isLoading}
        maxWidth="md"
      >
        <SepratorAccModal data={sepratorAccMutation.data?.data || []} />
      </FixedModal>

      {/* project modal */}
      <FixedModal
        open={isOpenProjectModal}
        handleClose={() => setIsOpenProjectModal(false)}
        title={detailModalTitle}
        loading={sepratorProjectMutation.isLoading}
        maxWidth="md"
      >
        <SepratorProjectModal1
          data={sepratorProjectMutation.data?.data || []}
          formData={formData}
          baseModal1Title={detailModalTitle}
          baseCodingId={codingId}
        />
      </FixedModal>
    </AdminLayout>
  );
}

export default BudgetSepratorPage;
