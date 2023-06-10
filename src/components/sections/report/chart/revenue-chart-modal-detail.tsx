import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import green from "@mui/material/colors/green";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FixedModal from "components/ui/modal/fixed-modal";
import RevenueChartModal2 from "./revenue-chart-modal-2";
import PrintIcon from "@mui/icons-material/Print";

import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode, useState } from "react";
import { GetSingleDetailRevenueChartShape } from "types/data/report/chart/revenue-chart-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { revenueChartApi } from "api/report/chart-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { revenueModal1Stimul } from "stimul/budget/report/revenue/revenue-modal1-stimul";
import {
  getGeneralFieldItemBudgetKind,
  getGeneralFieldItemBudgetMethod,
  getGeneralFieldItemNumber,
  getGeneralFieldItemYear,
} from "helper/export-utils";

interface TableDataItemShape {
  number: ReactNode;
  area: ReactNode;
  mosavab: ReactNode;
  mosavabDaily: ReactNode;
  expense: ReactNode;
  notDoneValue: ReactNode;
  dailyJazb: ReactNode;
  mosavabJazb: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface RevenueChartModalDetailProps {
  data: any[];
  formData: any;
}
function RevenueChartModalDetail(props: RevenueChartModalDetailProps) {
  const { data, formData } = props;

  // print
  const handlePrintForm = () => {
    const yearLabel = getGeneralFieldItemYear(formData, 1);
    const budgetKindLabel = getGeneralFieldItemBudgetMethod(formData);

    if (tableData.length) {
      revenueModal1Stimul({
        data: tableData,
        footer: tableFooter,
        year: yearLabel,
        budgetKind: budgetKindLabel,
        number: "ریال",
      });
    }
  };

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton color="primary" onClick={handlePrintForm}>
          <PrintIcon />
        </IconButton>
      ),
      colspan: 11,
    },
  ];

  // heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: "ردیف",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "مناطق/سازمانها",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "درآمد",
      colspan: 3,
      align: "center",
    },
    {
      title: "فروش",
      colspan: 3,
      align: "center",
    },
    {
      title: "وام",
      colspan: 3,
      align: "center",
    },
    {
      title: "کل",
      colspan: 3,
      align: "center",
    },
    {
      title: "دریافت از خزانه",
      colspan: 3,
      align: "center",
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      hiddenSelf: true,
    },
    {
      title: "منطقه",
      name: "areaName",
      // canSort: true,
      hiddenSelf: true,
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavabRevenue",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "عملکرد",
      name: "expenseRevenue",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "% جذب",
      name: "percentRevenue",
      percent: true,
      // canSort: true,
    },
    {
      title: "مصوب",
      name: "mosavabSale",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "عملکرد",
      name: "expenseSale",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "% جذب",
      name: "percentSale",
      percent: true,
      // canSort: true,
    },
    {
      title: "مصوب",
      name: "mosavabLoan",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "عملکرد",
      name: "expenseLoan",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "% جذب",
      name: "percentLoan",
      percent: true,
      // canSort: true,
    },
    {
      title: "مصوب",
      name: "mosavabKol",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "عملکرد",
      name: "expenseKol",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "% جذب",
      name: "percentKol",
      percent: true,
      // canSort: true,
    },
    {
      title: "مصوب",
      name: "mosavabDaryaftAzKhazane",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "عملکرد",
      name: "expenseDaryaftAzKhazane",
      split: true,
      align: "left",
      // canSort: true,
    },
    {
      title: "% جذب",
      name: "percentDaryaftAzKhazane",
      percent: true,
      // canSort: true,
    },
    // {
    //   title: "مصوب فروش",
    //   name: "mosavabSale",
    //   split: true,
    //   align: "left",
    //   // canSort: true,
    // },
    // {
    //   title: "عملیات",
    //   name: "actions",
    // },
  ];

  // body
  const actionButtons = (
    row: TableDataItemShape & GetSingleDetailRevenueChartShape
  ) => (
    <IconButton
      size="small"
      color="primary"
      onClick={() => handleClickDetailValues(row)}
    >
      <FormatListBulletedIcon />
    </IconButton>
  );

  const getNotDoneColor = (item: GetSingleDetailRevenueChartShape) => {
    if (item.notGet < 0) {
      return green[800];
    }
  };

  const formatTableData = (
    unFormatData: GetSingleDetailRevenueChartShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        // area: item.areaName,
        // dailyJazb: item.percentMosavabDaily,
        // expense: item.expense,
        // "textcolor-expense": item.expense < 0 ? "red" : "",
        // mosavab: item.mosavab,
        // mosavabDaily: item.mosavabDaily,
        // mosavabJazb: item.percentMosavab,
        // notDoneValue: item.notGet,
        // actions: actionButtons,
        // "textcolor-notDoneValue": () => getNotDoneColor(item),
      })
    );

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const sum_expenseDaryaftAzKhazane = sumFieldsInSingleItemData(
    data,
    "expenseDaryaftAzKhazane"
  );
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 2,
    areaName: null,
    // expenseDaryaftAzKhazane: sum_expenseDaryaftAzKhazane,
    // expenseDaryaftAzKhazane: sum_expenseDaryaftAzKhazane,
    // expenseKol: sum_expenseDaryaftAzKhazane,
    // expenseDaryaftAzKhazane: sum_expenseDaryaftAzKhazane,
  };

  // modal
  const [isOpenMoreDetailModal, setIsOpenMoreDetailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const dataTableMutation = useMutation(revenueChartApi.getChart);

  const queryClient = useQueryClient();

  const handleCloseMoreContentModal = () => {
    setIsOpenMoreDetailModal(false);
  };

  const [areaId, setAreaId] = useState(0);

  const revenueChart = useQuery(
    reactQueryKeys.report.chart.revenueMoreDetail,
    () => revenueChartApi.getChart({}),
    {
      enabled: false,
    }
  );

  const handleClickDetailValues = (
    row: GetSingleDetailRevenueChartShape & TableDataItemShape
  ) => {
    setModalTitle(row.areaName as string);

    queryClient.setQueryData(reactQueryKeys.report.chart.revenueMoreDetail, []);
    console.log(row.areaId);

    setAreaId(row.areaId as number);
    dataTableMutation.mutate({
      ...formData,
      [revenueChartFormConfig.area]: row.areaId,
    });
    setIsOpenMoreDetailModal(true);
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        headGroups={tableHeadGroups}
        notFixed
        canSort
      />

      {/* <FixedModal
        open={isOpenMoreDetailModal}
        handleClose={handleCloseMoreContentModal}
        loading={dataTableMutation.isLoading}
        title={modalTitle}
        maxWidth="md"
        maxHeight="70%"
      >
        <RevenueChartModal2
          data={revenueChart.data?.data || dataTableMutation.data?.data || []}
          formData={formData}
          area={areaId}
        />
      </FixedModal> */}
    </>
  );
}

export default RevenueChartModalDetail;
