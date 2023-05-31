import AdminLayout from "components/layout/admin-layout";
import BudgetReportTypeInput from "components/sections/inputs/budget-chart-type-input";
import ReportRevenueChartPage from "pages/report/chart/revenue-chart-page";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import SectionGuard from "components/auth/section-guard";
import ReportRavandBudgetChart from "components/sections/budget/reports/ravand/report-ravand-budget-chart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useEffect, useState } from "react";
import { accessNamesConfig } from "config/access-names-config";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import { budgetReportItems } from "config/features/general-fields-config";
import userStore from "hooks/store/user-store";
import ReportProctorAbstructPage from "pages/report/proctor/abstract-page";
import AbstructBudgetPage from "pages/report/budget/abstruct-budget-page";
import BudgetReportDeviation from "../../../components/sections/budget/reports/deviation/budget-deviation";

function BudgetReportsPage() {
  const [tabValue, setTabValue] = useState(undefined);
  const userLicenses = userStore((state) => state.permissions);

  // title
  useEffect(() => {
    const label = budgetReportItems.find(
      (item) => item.value === tabValue
    )?.label;
    if (label) {
      document.title = label;
    } else {
      document.title = "گزارشات";
    }
  }, [tabValue]);

  // tabs
  const formatTabPermission = (id: number) => {
    switch (id) {
      case 1:
        return accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE;

      case 2:
        return accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND;

      case 3:
        return accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT;

      case 4:
        return accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY;

      case 5:
        return accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION;

      default:
        return "";
    }
  };

  const budgetTabRender = (
    <Tabs
      value={tabValue}
      onChange={(e, newValue) => {
        setTabValue(newValue);
      }}
    >
      {budgetReportItems
        .filter((item) =>
          checkHavePermission(
            userLicenses,
            [formatTabPermission(item.value as number)],
            accessNamesConfig.BUDGET__REPORT_PAGE
          )
        )
        .map((item, i) => (
          <Tab label={item.label} value={item.value} />
        ))}
    </Tabs>
  );

  const tabList = {
    1: <ReportRevenueChartPage tabRender={budgetTabRender} />,
    2: <ReportRavandBudgetChart tabRender={budgetTabRender} />,
    3: <ReportProctorAbstructPage tabRender={budgetTabRender} />,
    4: <AbstructBudgetPage tabRender={budgetTabRender} />,
    5: <BudgetReportDeviation tabRender={budgetTabRender} />,
  };

  return (
    <AdminLayout>
      {tabValue ? (
        tabList[tabValue]
      ) : (
        <Box
          sx={{
            p: 2,
            bgcolor: "grey.200",
          }}
        >
          <Box>{budgetTabRender}</Box>
        </Box>
      )}
    </AdminLayout>
  );
}

export default BudgetReportsPage;
