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
import PageGuard from "components/auth/page-guard.";
import WellcomePage from "pages/wellcome-page";
import PostsOrganzationPage from "pages/organization/posts-page";
import TrazPage from "pages/traz/traz-page";

import { createBrowserRouter } from "react-router-dom";
import { accessNamesConfig } from "config/access-names-config";
import BudgetCodingPage from "pages/budget/coding-page ";

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
        permission={accessNamesConfig.REVENUE_CHART_PAGE}
      />
    ),
  },
  {
    path: "/report/proctor/abstract",
    element: (
      <PageGuard
        render={<ReportProctorAbstructPage />}
        permission={accessNamesConfig.ABSTRUCT_PROCTOR_PAGE}
      />
    ),
  },
  // budget
  {
    path: "/budget/proposal",
    element: (
      <PageGuard
        render={<BudgetProposalPage />}
        permission={accessNamesConfig.BUDGET_PROPOSAL_PAGE}
      />
    ),
  },
  {
    path: "/budget/seprator",
    element: (
      <PageGuard
        render={<BudgetSepratorPage />}
        permission={accessNamesConfig.SEPRATOR_BUDGET_PAGE}
      />
    ),
  },
  {
    path: "/budget/coding",
    element: (
      <PageGuard
        render={<BudgetCodingPage />}
        permission={accessNamesConfig.BUDGET_CODING_PAGE}
      />
    ),
  },
  // transfer
  {
    path: "/transfer",
    element: (
      <PageGuard
        render={<TransferPage />}
        permission={accessNamesConfig.TRANSFER_PAGE}
      />
    ),
  },
  // credit
  {
    path: "/credit/request",
    element: (
      <PageGuard
        render={<RequestCreditPage />}
        permission={accessNamesConfig.CREDIT_REQUEST_PAGE}
      />
    ),
  },
  // access
  {
    path: "/access",
    element: (
      <PageGuard
        render={<AccessPage />}
        permission={accessNamesConfig.ACCESS_PAGE}
      />
    ),
  },
  // project
  {
    path: "/project/org",
    element: (
      <PageGuard
        render={<OrgProjectPage />}
        permission={accessNamesConfig.PROJECT_ORG_PAGE}
      />
    ),
  },
  {
    path: "/project/meetings",
    element: (
      <PageGuard
        render={<MeetingsProjectPage />}
        permission={accessNamesConfig.PROJECT_MEETINGS_PAGE}
      />
    ),
  },

  // organization
  {
    path: "/organization/posts",
    element: (
      <PageGuard
        render={<PostsOrganzationPage />}
        permission={accessNamesConfig.ORGANIZATION_POSTS_PAGE}
      />
    ),
  },
  // traz
  {
    path: "/traz",
    element: (
      <PageGuard
        render={<TrazPage />}
        permission={accessNamesConfig.TRAZ_PAGE}
      />
    ),
  },
]);

export default router;
