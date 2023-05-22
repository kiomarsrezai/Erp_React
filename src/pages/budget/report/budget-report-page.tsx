import AdminLayout from "components/layout/admin-layout";
import BudgetReportTypeInput from "components/sections/inputs/budget-chart-type-input";
import ReportRevenueChartPage from "pages/report/chart/revenue-chart-page";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import SectionGuard from "components/auth/section-guard";
import ReportRavandBudgetChart from "components/sections/budget/reports/ravand/report-ravand-budget-chart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useState } from "react";
import { accessNamesConfig } from "config/access-names-config";
import { joinPermissions } from "helper/auth-utils";
import { budgetReportItems } from "config/features/general-fields-config";

function BudgetReportsPage() {
  const [formData, setFormData] = useState({
    chartType: null,
  });

  const [tabValue, setTabValue] = useState(0);

  const budgetTypeComboRender = (
    <BudgetReportTypeInput
      setter={setFormData}
      value={formData.chartType}
      name="chartType"
      permissionForm={accessNamesConfig.BUDGET__REPORT_PAGE}
    />
  );

  const budgetTabRender = (
    <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
      {budgetReportItems.map((item, i) => (
        <Tab label={item.label} value={item.value} />
      ))}
    </Tabs>
  );

  // revenue chart page
  // formData.chartType === 1
  if (tabValue === 1) {
    return <ReportRevenueChartPage tabRender={budgetTabRender} />;
  }

  // ravand chart page
  // formData.chartType === 2
  if (tabValue === 2) {
    return <ReportRavandBudgetChart tabRender={budgetTabRender} />;
  }

  // no one selected
  // return (
  //   <AdminLayout>
  //     <Box padding={2}>
  //       <Grid container spacing={2}>
  //         <Grid sm={2}>
  //           <SectionGuard
  //             permission={joinPermissions([
  //               accessNamesConfig.BUDGET__REPORT_PAGE,
  //               accessNamesConfig.BUDGET__REPORT_PAGE_COMBO,
  //             ])}
  //           >
  //             {budgetTypeComboRender}
  //           </SectionGuard>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   </AdminLayout>
  // );

  return (
    <AdminLayout>
      <Box sx={{ borderBottom: 1, borderColor: "divider", m: 2 }}>
        {budgetTabRender}
      </Box>
    </AdminLayout>
  );
}

export default BudgetReportsPage;
