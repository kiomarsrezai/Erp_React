import Paper from "@mui/material/Paper";
import AdminLayout from "components/layout/admin-layout";
import BulletChart from "components/chart/bullet-chart";

import { revenueChartApi } from "api/report/chart";
import { useQuery } from "@tanstack/react-query";

function ReportRevenueChartPage() {
  // const revenueChart = useQuery(["revenuse-chart"], revenueChartApi.getChart);

  // console.log(revenueChart.data);
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
        <BulletChart />
      </Paper>
    </AdminLayout>
  );
}

export default ReportRevenueChartPage;
