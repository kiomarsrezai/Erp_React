import AdminLayout from "components/layout/admin-layout";
import BudgetReportTypeInput from "components/sections/inputs/budget-chart-type-input";
import ReportRevenueChartPage from "pages/report/chart/revenue-chart-page";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import SectionGuard from "components/auth/section-guard";

import { useState } from "react";
import { accessNamesConfig } from "config/access-names-config";
import { joinPermissions } from "helper/auth-utils";

function BudgetReportsPage() {
  const [formData, setFormData] = useState({
    chartType: null,
  });

  const budgetTypeComboRender = (
    <BudgetReportTypeInput
      setter={setFormData}
      value={formData.chartType}
      name="chartType"
      permissionForm={accessNamesConfig.BUDGET__REPORT_PAGE}
    />
  );

  // revenue chart page
  if (formData.chartType === 1) {
    return <ReportRevenueChartPage inputRender={budgetTypeComboRender} />;
  }

  // no one selected
  return (
    <AdminLayout>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid sm={2}>
            <SectionGuard
              permission={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_COMBO,
              ])}
            >
              {budgetTypeComboRender}
            </SectionGuard>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default BudgetReportsPage;
