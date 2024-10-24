import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AdminLayout from "components/layout/admin-layout";
import BulletChart from "components/data/chart/bullet-chart";
import useLayoutStore from "hooks/store/layout-store";
import ReportRavandBudgetForm from "./report-ravand-budget-form";

import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { globalConfig } from "config/global-config";
import { ravandChartApi } from "api/report/ravand-chart-api";
import { ravandChartConfig } from "config/features/report/chart/ravand-chart-config";
import { GetRavandChartShape } from "types/data/report/chart/ravand-chart-type";
import FixedChart from "components/data/chart/fixed-chart";

interface ChartDataShape {
  Mosavab: number;
  MosavabDaily: number;
  Expense?: number;
  AreaName: string;
}

const formatChatData = (
  unFormatData: GetRavandChartShape
): ChartDataShape[] => {
  const length = unFormatData[0].length;
  const formatedData: ChartDataShape[] = [];

  for (let i = 0; i < length; i++) {
    const dataItem: ChartDataShape = {
      AreaName: unFormatData[2][i] as any,
      Mosavab: unFormatData[1][i],
      MosavabDaily: unFormatData[2][i],
    };
  
    if(unFormatData[3][i] !== 0){
      dataItem.Expense = unFormatData[3][i];
    }
    formatedData.push(dataItem);
  }
  return formatedData;
};

interface ReportRavandBudgetChartProps {
  inputRender?: ReactNode;
  tabRender?: ReactNode;
}

function ReportRavandBudgetChart(props: ReportRavandBudgetChartProps) {
  const { inputRender, tabRender } = props;

  const [formData, setFormData] = useState({
    [ravandChartConfig.area]: undefined,
    [ravandChartConfig.budget_method]: undefined,
  });

  // get data
  const ravandQuery = useQuery(reactQueryKeys.report.chart.ravand, () =>
    ravandChartApi.getChart({})
  );

  const chartData = ravandQuery.data
    ? formatChatData(ravandQuery.data.data)
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
        <ReportRavandBudgetForm
          showBtnAmount={!!ravandQuery.data?.data?.[0]?.length}
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
        {!!ravandQuery.data?.data?.[0]?.length && (
          <FixedChart
            id="chart"
            lineName="Expense"
            barName="Mosavab"
            lineLabel="عملکرد"
            barLabel="مصوب"
            data={chartData}
          />
        )}
      </Box>
    </Paper>
    // </AdminLayout>
  );
}

export default ReportRavandBudgetChart;
