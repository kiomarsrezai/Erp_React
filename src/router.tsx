import LoginPage from "pages/login-page";
import ReportRevenueChartPage from "pages/report/chart/revenue-page";
import ReportProctorAbstructPage from "pages/report/proctor/abstract-page";
import TransferPage from "pages/transfer";
import BudgetSepratorPage from "pages/budget/seprator-page";
import BudgetProposalPage from "pages/budget/proposal-page";

import { createBrowserRouter } from "react-router-dom";

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
]);

export default router;
