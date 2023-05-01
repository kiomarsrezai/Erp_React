import FixedTable from "components/data/table/fixed-table";

import green from "@mui/material/colors/green";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode } from "react";
import { GetSingleDetailRevenueChartShape } from "types/data/report/chart/revenue-chart-type";
import { TableHeadShape } from "types/table-type";

interface TableDataItemShape {
  area: ReactNode;
  mosavab: ReactNode;
  mosavabDaily: ReactNode;
  expense: ReactNode;
  notDoneValue: ReactNode;
  dailyJazb: ReactNode;
  mosavabJazb: ReactNode;
}

interface ChartDetailModalTableProps {
  data: any[];
}
function RevenueChartDetailModalTable(props: ChartDetailModalTableProps) {
  const { data } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "منطقه",
      name: "area",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "مصوب روزانه",
      name: "mosavabDaily",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
    },
    {
      title: "محقق نشده",
      name: "notDoneValue",
      split: true,
      align: "left",
    },
    {
      title: "جذب روزانه %",
      name: "dailyJazb",
      percent: true,
    },
    {
      title: "جذب به مصوب %",
      name: "mosavabJazb",
      percent: true,
    },
  ];

  // body
  const getNotDoneColor = (item: GetSingleDetailRevenueChartShape) => {
    if (item.notGet < 0) {
      return green[800];
    }
  };

  const formatTableData = (
    unFormatData: GetSingleDetailRevenueChartShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      area: item.areaName,
      dailyJazb: item.percentMosavabDaily,
      expense: item.expense,
      mosavab: item.mosavab,
      mosavabDaily: item.mosavabDaily,
      mosavabJazb: item.percentMosavab,
      notDoneValue: item.notGet,
      "textcolor-notDoneValue": () => getNotDoneColor(item),
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const tableFooter: TableDataItemShape = {
    area: "جمع",
    dailyJazb: Math.round(
      (sumFieldsInSingleItemData(data, "expense") /
        sumFieldsInSingleItemData(data, "mosavabDaily")) *
        100
    ),
    expense: sumFieldsInSingleItemData(data, "expense"),
    mosavab: sumFieldsInSingleItemData(data, "mosavab"),
    mosavabDaily: sumFieldsInSingleItemData(data, "mosavabDaily"),
    mosavabJazb: Math.round(
      (sumFieldsInSingleItemData(data, "expense") /
        sumFieldsInSingleItemData(data, "mosavab")) *
        100
    ),
    notDoneValue: sumFieldsInSingleItemData(data, "notGet"),
  };

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default RevenueChartDetailModalTable;
