import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import green from "@mui/material/colors/green";
import Grid from "@mui/material/Unstable_Grid2";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FixedModal from "components/ui/modal/fixed-modal";
import RevenueChartModal2 from "./revenue-chart-modal-2";
import PrintIcon from "@mui/icons-material/Print";

import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
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
import { revenueModalDetailStimul } from "stimul/budget/report/revenue/revenue-modal-detail-stimul";
import NumbersInput from "components/sections/inputs/numbers-input";
import { generalFieldsConfig } from "config/features/general-fields-config";
import { convertNumbers } from "helper/number-utils";

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
      revenueModalDetailStimul({
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

  // top head group
  const [filterFormData, setFilterFormData] = useState({
    [generalFieldsConfig.numbers]: 1,
  });
  const tableTopHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <Grid container>
          <Grid sm={2}>
            <NumbersInput
              setter={setFilterFormData}
              value={filterFormData[generalFieldsConfig.numbers] as number}
            />
          </Grid>

          <Grid sm={2}>
            <IconButton color="primary" onClick={handlePrintForm}>
              <PrintIcon />
            </IconButton>
          </Grid>
        </Grid>
      ),
      colspan: 17,
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
      title: "فروش اموال منقول و غیر منقول",
      colspan: 3,
      align: "center",
    },
    {
      title: "وام و اوراق مشارکت",
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

  const formatedData = convertNumbers(
    data,
    [
      "mosavabRevenue",
      "expenseRevenue",
      "mosavabSale",
      "expenseSale",
      "mosavabLoan",
      "expenseLoan",
      "mosavabKol",
      "expenseKol",
      "mosavabDaryaftAzKhazane",
      "expenseDaryaftAzKhazane",
    ],
    filterFormData[generalFieldsConfig.numbers]
  );

  const tableData = formatTableData(formatedData);
  /*
      "areaId": 1,
      "areaName": "01",
      "mosavabRevenue": 3027485000000,
      "expenseRevenue": 0,
      "mosavabSale": 60000000000,
      "expenseSale": 0,
      "mosavabLoan": 0,
      "expenseLoan": 0,
      "mosavabDaryaftAzKhazane": 0,
      "expenseDaryaftAzKhazane": 0,
      "mosavabKol": 3087485000000,
      "expenseKol": 0,
      "percentRevenue": 0,
      "percentSale": 0,
      "percentLoan": 0,
      "percentDaryaftAzKhazane": 0,
      "percentKol": 0
 */
  // table footer
  const sum_mosavabRevenue = sumFieldsInSingleItemData(
    formatedData,
    "mosavabRevenue"
  );
  const sum_expenseRevenue = sumFieldsInSingleItemData(
    formatedData,
    "expenseRevenue"
  );
  const sum_mosavabSale = sumFieldsInSingleItemData(
    formatedData,
    "mosavabSale"
  );
  const sum_expenseSale = sumFieldsInSingleItemData(
    formatedData,
    "expenseSale"
  );
  const sum_mosavabLoan = sumFieldsInSingleItemData(
    formatedData,
    "mosavabLoan"
  );

  const sum_expenseLoan = sumFieldsInSingleItemData(
    formatedData,
    "expenseLoan"
  );

  const sum_mosavabDaryaftAzKhazane = sumFieldsInSingleItemData(
    formatedData,
    "mosavabDaryaftAzKhazane"
  );

  const sum_expenseDaryaftAzKhazane = sumFieldsInSingleItemData(
    formatedData,
    "expenseDaryaftAzKhazane"
  );

  const sum_mosavabKol = sumFieldsInSingleItemData(formatedData, "mosavabKol");

  const sum_expenseKol = sumFieldsInSingleItemData(formatedData, "expenseKol");

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 2,
    areaName: null,
    mosavabRevenue: sum_mosavabRevenue,
    expenseRevenue: sum_expenseRevenue,
    mosavabSale: sum_mosavabSale,
    expenseSale: sum_expenseSale,
    mosavabLoan: sum_mosavabLoan,
    expenseLoan: sum_expenseLoan,
    mosavabKol: sum_mosavabKol,
    expenseKol: sum_expenseKol,
    mosavabDaryaftAzKhazane: sum_mosavabDaryaftAzKhazane,
    expenseDaryaftAzKhazane: sum_expenseDaryaftAzKhazane,

    percentRevenue: getPercent(sum_expenseRevenue, sum_mosavabRevenue),
    percentSale: getPercent(sum_expenseSale, sum_mosavabSale),
    percentLoan: getPercent(sum_expenseLoan, sum_mosavabLoan),
    percentKol: getPercent(sum_expenseKol, sum_mosavabKol),
    percentDaryaftAzKhazane: getPercent(
      sum_mosavabDaryaftAzKhazane,
      sum_expenseDaryaftAzKhazane
    ),
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
        topHeadGroups={tableTopHeadGroups}
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
