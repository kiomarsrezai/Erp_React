import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AdminLayout from "components/layout/admin-layout";
import BulletChart from "components/data/chart/bullet-chart";
import RevenueChartForm from "components/sections/forms/report/chart/revenue-chart-form";
import useLayoutStore from "hooks/store/layout-store";

import { revenueChartApi } from "api/report/chart-api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";

interface ChartDataShape {
  Mosavab: number;
  MosavabDaily: number;
  Expense: number;
  AreaName: string;
}

type GetChartShape = [string[], number[], number[], number[]];

const formatChatData = (unFormatData: GetChartShape): ChartDataShape[] => {
  const length = unFormatData[0].length;
  const formatedData: ChartDataShape[] = [];

  for (let i = 0; i < length; i++) {
    const dataItem: ChartDataShape = {
      AreaName: unFormatData[0][i],
      Mosavab: unFormatData[1][i],
      MosavabDaily: unFormatData[3][i],
      Expense: unFormatData[2][i],
    };
    formatedData.push(dataItem);
  }
  return formatedData;
};

function ReportRevenueChartPage() {
  const [formData, setFormData] = useState({
    [revenueChartFormConfig.YEAR]: 32,
    [revenueChartFormConfig.CENTER]: 2,
    [revenueChartFormConfig.ORGAN]: 3,
    [revenueChartFormConfig.BUDGET_METHOD]: 1,
    [revenueChartFormConfig.REVENUE]: true,
    [revenueChartFormConfig.SALE]: true,
    [revenueChartFormConfig.LAON]: true,
    [revenueChartFormConfig.NIABATI]: true,
  });

  // get data
  const revenueChart = useQuery(reactQueryKeys.report.chart.revenue, () =>
    revenueChartApi.getChart({})
  );

  const chartData: ChartDataShape[] = revenueChart.data
    ? formatChatData(revenueChart.data.data)
    : [];

  // height
  const normalize = useLayoutStore((state) => state.normlize);
  const [formHeight, setFormHeight] = useState(0);
  const boxElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFormHeight(boxElement.current?.clientHeight || 0);
  }, [normalize]);

  return (
    <AdminLayout>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          height: "calc(100vh - 64px)",
        }}
      >
        <Box ref={boxElement}>
          <RevenueChartForm formData={formData} setFormData={setFormData} />
        </Box>
        <Box
          sx={{
            height: `calc(100% - ${formHeight}px)`,
            width: "calc(100% - 100px)",
            direction: "rtl",
            margin: "auto",
          }}
        >
          {revenueChart.isLoading && "loading"}
          {revenueChart.data && (
            <BulletChart
              lineLabel="عملکرد"
              chartLabel="مصوب"
              data={chartData}
            />
          )}
        </Box>
      </Paper>
    </AdminLayout>
  );
}

export default ReportRevenueChartPage;
