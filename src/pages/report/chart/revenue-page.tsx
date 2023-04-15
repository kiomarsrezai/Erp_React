import Paper from "@mui/material/Paper";
import AdminLayout from "components/layout/admin-layout";
import BulletChart from "components/data/chart/bullet-chart";

import { revenueChartApi } from "api/report/chart-api";
import { useQuery } from "@tanstack/react-query";

type ChartDataShape = {
  Mosavab: number;
  MosavabDaily: number;
  Expense: number;
  AreaName: string;
};

type GetChartShape = [string[], number[], number[], number[]];

const formatChatData = (unFormatData: GetChartShape): ChartDataShape[] => {
  const length = unFormatData[0].length;
  const formatedData: ChartDataShape[] = [];

  for (let i = 0; i < length; i++) {
    const dataItem: ChartDataShape = {
      AreaName: unFormatData[0][i],
      Mosavab: unFormatData[1][i],
      MosavabDaily: unFormatData[2][i],
      Expense: unFormatData[3][i],
    };
    formatedData.push(dataItem);
  }
  return formatedData;
};

function ReportRevenueChartPage() {
  const revenueChart = useQuery(["revenuse-chart"], revenueChartApi.getChart);

  const chartData: ChartDataShape[] = revenueChart.data
    ? formatChatData(revenueChart.data.data)
    : [];

  console.log("chartData", chartData);

  return (
    <AdminLayout>
      <Paper
        sx={{
          width: "100%",
          // direction: "rtl",
          overflow: "hidden",
          height: "calc(100vh - 64px)",
        }}
      >
        {revenueChart.isLoading && "loading"}
        {revenueChart.data && (
          <BulletChart lineLabel="عملکرد" chartLabel="مصوب" data={chartData} />
        )}
      </Paper>
    </AdminLayout>
  );
}

export default ReportRevenueChartPage;
