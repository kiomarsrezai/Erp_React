import AdminLayout from "components/layout/admin-layout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { globalConfig } from "config/global-config";

function WellcomePage() {
  return (
    <AdminLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={`calc(100vh - ${globalConfig.headerHeight}px)`}
      >
        <Typography color="GrayText">به سامانه ERP خوش آمدید.</Typography>
      </Box>
    </AdminLayout>
  );
}

export default WellcomePage;
