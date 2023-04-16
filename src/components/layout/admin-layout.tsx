import Box from "@mui/material/Box";
import MainHeader from "./admin-header";

import { ReactNode } from "react";
import AdminSidenav from "./sidenav/admin-sidenav";

interface AdminLayoutProps {
  children: ReactNode;
}
function AdminLayout(props: AdminLayoutProps) {
  const { children } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidenav />
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <MainHeader />
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;
