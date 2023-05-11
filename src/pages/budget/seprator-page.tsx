import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import SepratoeBudgetForm from "components/sections/forms/budget/seprator-budget-form";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import SepratorDetailModal from "components/sections/forms/budget/seprator-detail-modal";

import { TableHeadShape } from "types/table-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode, useState } from "react";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { getBgColorBudget } from "helper/get-color-utils";

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

  const actionButtons = (row: TableDataItemShape | any) => (
    <>
      {formData[sepratorBudgetConfig.BUDGET_METHOD] === 3 && row.crud && (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleClickDetailIcon(row)}
        >
          <CreditCardIcon />
        </IconButton>
      )}
    </>
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
  const tableFooter: TableDataItemShape | any = {
    id: "جمع",
    "colspan-id": 3,
    code: null,
    description: null,
    mosavab: sumFieldsInSingleItemData(
      sepratorQuery.data?.data,
      "mosavab",
      (item: GetSingleSepratorItemShape) => item.levelNumber === 1
    ),
    edit: sumFieldsInSingleItemData(
      sepratorQuery.data?.data,
      "edit",
      (item: GetSingleSepratorItemShape) => item.levelNumber === 1
    ),
    creditAmount: sumFieldsInSingleItemData(
      sepratorQuery.data?.data,
      "creditAmount",
      (item: GetSingleSepratorItemShape) => item.levelNumber === 1
    ),
    expense: sumFieldsInSingleItemData(
      sepratorQuery.data?.data,
      "expense",
      (item: GetSingleSepratorItemShape) => item.levelNumber === 1
    ),
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
        loading={sepratorDetailMutation.isLoading}
      >
        <SepratorDetailModal
          title={detailModalTitle}
          formdata={formData}
          coding={codingId}
          data={sepratorDetailDataQuery.data?.data || []}
        />
      </FixedModal>
    </AdminLayout>
  );
}

export default BudgetSepratorPage;
