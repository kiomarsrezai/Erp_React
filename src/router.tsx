import LoginPage from "pages/login-page";
import ReportPage from "pages/report-page";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard/report",
    element: <ReportPage />,
  },
]);

export default router;
