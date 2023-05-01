import LoginPage from "pages/auth/login-page";
import ReportRevenueChartPage from "pages/report/chart/revenue-chart-page";
import ReportProctorAbstructPage from "pages/report/proctor/abstract-page";
import TransferPage from "pages/transfer/transfer-page";
import BudgetSepratorPage from "pages/budget/seprator-page";
import BudgetProposalPage from "pages/budget/proposal-page";
import RequestCreditPage from "pages/credit/request-page";
import AccessPage from "pages/access-page";
import OrgProjectPage from "pages/project/org-page";
import MeetingsProjectPage from "pages/project/meetings-page";

import { createBrowserRouter } from "react-router-dom";
import PageGuard from "components/auth/page-guard.";
import WellcomePage from "pages/wellcome-page";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { proposalConfig } from "config/features/budget/proposal-config";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { transferConfig } from "config/features/transfer/transfer-config";

const router = createBrowserRouter([
  // globla
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/wellcome",
    element: <PageGuard render={<WellcomePage />} />,
  },

  // report
  {
    path: "/report/chart/revenue",
    element: (
      <PageGuard
        render={<ReportRevenueChartPage />}
        permission={revenueChartFormConfig.PAGE_NAME}
      />
    ),
  },
  {
    path: "/report/proctor/abstract",
    element: (
      <PageGuard
        render={<ReportProctorAbstructPage />}
        permission={abstructProctorConfig.PAGE_NAME}
      />
    ),
  },
  // budget
  {
    path: "/budget/proposal",
    element: (
      <PageGuard
        render={<BudgetProposalPage />}
        permission={proposalConfig.PAGE_NAME}
      />
    ),
  },
  {
    path: "/budget/seprator",
    element: (
      <PageGuard
        render={<BudgetSepratorPage />}
        permission={sepratorBudgetConfig.PAGE_NAME}
      />
    ),
  },
  // transfer
  {
    path: "/transfer",
    element: (
      <PageGuard
        render={<TransferPage />}
        permission={transferConfig.PAGE_NAME}
      />
    ),
  },
  // credit
  {
    path: "/credit/request",
    element: <PageGuard render={<RequestCreditPage />} />,
  },
  // access
  {
    path: "/access",
    element: <PageGuard render={<AccessPage />} permission="permissions" />,
  },
  // project
  {
    path: "/project/org",
    element: <PageGuard render={<OrgProjectPage />} permission="project" />,
  },
  {
    path: "/project/meetings",
    element: (
      <PageGuard render={<MeetingsProjectPage />} permission="meetings" />
    ),
  },
]);

export default router;
