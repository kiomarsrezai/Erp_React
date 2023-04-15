import LoginPage from "pages/auth/login-page";
import ReportRevenueChartPage from "pages/report/chart/revenue-chart-page";
import ReportProctorAbstructPage from "pages/report/proctor/abstract-page";
import TransferPage from "pages/transfer";
import BudgetSepratorPage from "pages/budget/seprator-page";
import BudgetProposalPage from "pages/budget/proposal-page";

import { createBrowserRouter } from "react-router-dom";
import RequestCreditPage from "pages/credit/request-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  // report
  {
    path: "/report/chart/revenue",
    element: <ReportRevenueChartPage />,
  },
  {
    path: "/report/proctor/abstract",
    element: <ReportProctorAbstructPage />,
  },
  // budget
  {
    path: "/budget/proposal",
    element: <BudgetProposalPage />,
  },
  {
    path: "/budget/seprator",
    element: <BudgetSepratorPage />,
  },
  // transfer
  {
    path: "/transfer",
    element: <TransferPage />,
  },
  // credit
  {
    path: "/credit/request",
    element: <RequestCreditPage />,
  },
]);

export default router;
