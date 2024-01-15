import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AdminLayout from "components/layout/admin-layout";
import BulletChart from "components/data/chart/bullet-chart";
import useLayoutStore from "hooks/store/layout-store";
import RevenueChartForm from "components/sections/report/chart/revenue-chart-form";

import { revenueChartApi } from "api/report/chart-api";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { globalConfig } from "config/global-config";

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
      MosavabDaily: unFormatData[2][i],
      Expense: unFormatData[3][i],
    };
    formatedData.push(dataItem);
  }
  return formatedData;
};

interface ReportRevenueChartPageProps {
  inputRender?: ReactNode;
  tabRender?: ReactNode;
}

function ReportRevenueChartPage(props: ReportRevenueChartPageProps) {
  const { inputRender, tabRender } = props;

  const [formData, setFormData] = useState({
    [revenueChartFormConfig.YEAR]: undefined,
    [revenueChartFormConfig.CENTER]: undefined,
    [revenueChartFormConfig.ORGAN]: undefined,
    [revenueChartFormConfig.BUDGET_METHOD]: undefined,
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
  const normalize = useLayoutStore((state) => state.normalize);
  const [formHeight, setFormHeight] = useState(0);
  const boxElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFormHeight(boxElement.current?.clientHeight || 0);
  }, [normalize]);

  return (
    // <AdminLayout>
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        height: `calc(100vh - ${globalConfig.headerHeight}px)`,
      }}
    >
      <Box ref={boxElement}>
        <RevenueChartForm
          formData={formData}
          setFormData={setFormData}
          inputRender={inputRender}
          tabRender={tabRender}
        />
      </Box>
      <Box
        sx={{
          height: `calc(100% - ${formHeight}px)`,
          width: "calc(100% - 100px)",
          direction: "rtl",
          margin: "auto",
        }}
      >
        {!!revenueChart.data?.data?.[0]?.length && (
          <BulletChart
            id="chart"
            lineName="Expense"
            barName="Mosavab"
            innerBarName="MosavabDaily"
            lineLabel="عملکرد"
            barLabel="مصوب"
            innerBarLabel="مصوب روزانه"
            data={chartData}
          />
        )}
      </Box>
    </Paper>
    // </AdminLayout>
  );
}

export default ReportRevenueChartPage;
