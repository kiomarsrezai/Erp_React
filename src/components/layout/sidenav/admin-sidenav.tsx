import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AdminSidenavMenu from "./admin-sidenav-menu";
import AdminSidenavProfile from "./admin-sidenav-profile";

function AdminSidenav() {
  return (
    <Drawer
      sx={{
        width: 300,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box padding={1}>
        <AdminSidenavProfile />
        <Divider />
        <AdminSidenavMenu />
      </Box>
    </Drawer>
  );
}

export default AdminSidenav;
