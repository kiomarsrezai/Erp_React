import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AdminSidenavMenu from "./admin-sidenav-menu";
import AdminSidenavProfile from "./admin-sidenav-profile";
import useLayoutStore from "hooks/store/layout-store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CopyrightIcon from "@mui/icons-material/Copyright";

function AdminSidenav() {
  const normalize = useLayoutStore((state) => state.normlize);

  const drawerWidth = normalize ? 74 : 300;

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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Box padding={1}>
          <AdminSidenavProfile />
          <Divider />
          <AdminSidenavMenu />
        </Box>
        <Card sx={{ textAlign: "center" }}>
          <CardContent>
            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
              variant="caption"
              fontWeight="bold"
              color="grey.600"
            >
              <CopyrightIcon sx={{ fontSize: 14 }} />
              فاوا اهواز
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
}

export default AdminSidenav;
