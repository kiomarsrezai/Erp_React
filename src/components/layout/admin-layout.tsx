import Box from "@mui/material/Box";
import MainHeader from "./admin-header";
import AhadisProvider from "components/layout/ahadis-provider";
import AdminSidenav from "./sidenav/admin-sidenav";

import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}
function AdminLayout(props: AdminLayoutProps) {
  const { children } = props;

  return (
    <AhadisProvider>
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
    </AhadisProvider>
  );
}

export default AdminLayout;
