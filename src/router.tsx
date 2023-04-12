import LoginPage from "pages/login-page";
import ReportRevenvChartPage from "pages/report/chart/revenv-chart";
import ReportProctorAbstructPage from "pages/report/proctor/proctor-abstract";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/report/chart/revenv-chart",
    element: <ReportRevenvChartPage />,
  },
  {
    path: "/report/proctor/proctor-abstract",
    element: <ReportProctorAbstructPage />,
  },
]);

export default router;
