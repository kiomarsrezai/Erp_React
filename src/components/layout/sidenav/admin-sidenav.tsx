import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AdminSidenavMenu from "./admin-sidenav-menu";
import AdminSidenavProfile from "./admin-sidenav-profile";
import useLayoutStore from "hooks/store/layout-store";

function AdminSidenav() {
  const normalize = useLayoutStore((state) => state.normlize);

  const drawerWidth = normalize ? 70 : 300;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          overflow: "hidden",
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
