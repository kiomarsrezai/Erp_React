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

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  // report
  {
    path: "/report/chart/revenue",
    element: <PageGuard render={<ReportRevenueChartPage />} />,
  },
  {
    path: "/report/proctor/abstract",
    element: <PageGuard render={<ReportProctorAbstructPage />} />,
  },
  // budget
  {
    path: "/budget/proposal",
    element: <PageGuard render={<BudgetProposalPage />} />,
  },
  {
    path: "/budget/seprator",
    element: <PageGuard render={<BudgetSepratorPage />} />,
  },
  // transfer
  {
    path: "/transfer",
    element: <PageGuard render={<TransferPage />} />,
  },
  // credit
  {
    path: "/credit/request",
    element: <PageGuard render={<RequestCreditPage />} />,
  },
  // access
  {
    path: "/access",
    element: <PageGuard render={<AccessPage />} />,
  },
  // project
  {
    path: "/project/org",
    element: <PageGuard render={<OrgProjectPage />} />,
  },
  {
    path: "/project/meetings",
    element: <PageGuard render={<MeetingsProjectPage />} />,
  },
]);

export default router;
