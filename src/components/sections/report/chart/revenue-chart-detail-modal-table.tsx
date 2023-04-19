import FixedTable from "components/data/table/fixed-table";
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
    },
    {
      title: "مصوب روزانه",
      name: "mosavabDaily",
      split: true,
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
    },
    {
      title: "محقق نشده",
      name: "notDoneValue",
      split: true,
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
  const formatTableData = (
    unFormatData: GetSingleDetailRevenueChartShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      area: item.مناطق,
      dailyJazb: item["% جذب روزانه"],
      expense: item.عملکرد,
      mosavab: item.مصوب,
      mosavabDaily: item["مصوب روزانه"],
      mosavabJazb: item["% جذب مصوب"],
      notDoneValue: item["محقق نشده"],
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  return <FixedTable heads={tableHeads} data={tableData} notFixed />;
}

export default RevenueChartDetailModalTable;
