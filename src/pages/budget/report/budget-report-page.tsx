import AdminLayout from "components/layout/admin-layout";
import ReportRevenueChartPage from "pages/report/chart/revenue-chart-page";
import Box from "@mui/material/Box";
import ReportRavandBudgetChart from "components/sections/budget/reports/ravand/report-ravand-budget-chart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import userStore from "hooks/store/user-store";
import ReportProctorAbstructPage from "pages/report/proctor/abstract-page";
import AbstructBudgetPage from "pages/report/budget/abstruct-budget-page";
import BudgetReportDeviation from "../../../components/sections/budget/reports/deviation/budget-deviation";

import { useEffect, useState } from "react";
import { accessNamesConfig } from "config/access-names-config";
import { checkHavePermission } from "helper/auth-utils";
import { budgetReportItems } from "config/features/general-fields-config";
import BudgetReportProjectScaleForm from "components/sections/budget/reports/project-scale/budget-project-scale-form";
import BudgetReportProjectScale from "components/sections/budget/reports/project-scale/budget-project-scale";

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

      case 6:
        return accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE;

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
    6: <BudgetReportProjectScale tabRender={budgetTabRender} />,
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
