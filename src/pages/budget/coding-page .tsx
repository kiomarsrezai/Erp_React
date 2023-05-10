import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import CodingBudgetForm from "components/sections/forms/budget/coding/coding-budget-form";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { codingBudgetApi } from "api/budget/coding-api";
import FixedModal from "components/ui/modal/fixed-modal";
import CodingBudgetModal from "components/sections/forms/budget/coding/coding-budget-modal";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
import { Checkbox } from "@mui/material";
import { codingBudgetConfig } from "config/features/budget/coding-config";

interface TableDataItemShape {
  rowNumber: ReactNode;
  code: ReactNode;
  description: ReactNode;
  level: ReactNode;
  crud: ReactNode;
  show: ReactNode;
  revenueType: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function BudgetCodingPage() {
  const [formData, setFormData] = useState({
    [codingBudgetConfig.BUDGET_METHOD]: undefined,
    [codingBudgetConfig.crud]: undefined,
    [codingBudgetConfig.show]: undefined,
  });

  // form heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <CodingBudgetForm formData={formData} setFormData={setFormData} />,
      colspan: 8,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "rowNumber",
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
      title: "سطح",
      name: "level",
    },
    {
      title: "crud",
      name: "crud",
    },
    {
      title: "نمایش",
      name: "show",
    },
    {
      title: "نوع درامد",
      name: "revenueType",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const detailCodingMutation = useMutation(codingBudgetApi.getData);

  const openDeatilModal = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
    detailCodingMutation.mutate({
      ...formData,
      [codingBudgetConfig.mother_id]: row.id,
    });
    setIsOpenModal(true);
  };

  // data
  const actionButtons = (row: TableDataItemShape & GetSingleCodingItemShape) =>
    row.levelNumber === 3 ? (
      <IconButton
        size="small"
        color="primary"
        onClick={() => openDeatilModal(row)}
      >
        <FormatListBulletedIcon />
      </IconButton>
    ) : (
      ""
    );

  const getBgColor = (levelNumber: number) => {
    if (levelNumber === 1) {
      return "rgb(248,203,173)";
    } else if (levelNumber === 2) {
      return "rgb(198,224,180)";
    } else if (levelNumber === 3) {
      return "#fff";
    }
  };
  const formatTableData = (
    unFormatData: GetSingleCodingItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        rowNumber: i + 1,
        code: item.code,
        description: item.description,
        crud: <Checkbox defaultChecked={item.crud} onChange={() => {}} />,
        level: item.levelNumber,
        revenueType: item.codingRevenueKind,
        show: <Checkbox defaultChecked={item.show} />,
        bgcolor: getBgColor(item.levelNumber),
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const codingQuery = useQuery(
    reactQueryKeys.budget.coding.getData,
    () => codingBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = codingQuery.data
    ? formatTableData(codingQuery.data?.data)
    : [];

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={tableData || []}
        />
      </AdminLayout>

      <FixedModal
        open={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        maxWidth="xl"
        maxHeight="90%"
        loading={detailCodingMutation.isLoading}
      >
        <CodingBudgetModal
          formData={formData}
          data={detailCodingMutation.data?.data || []}
        />
      </FixedModal>
    </>
  );
}

export default BudgetCodingPage;
