import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import defaultProfileImg from "assets/images/default-profile.png";
import AdminSidenavMenu from "./admin-sidenav-menu";

function AdminSidenav() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 300,
          padding: 2,
        },
      }}
      open
    >
      <Stack
        direction="row"
        spacing={1}
        paddingBottom={1}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Avatar alt="Alireza Kasirzare" src={defaultProfileImg} />
        <Typography variant="body1" fontWeight="bold" color="GrayText">
          علیرضا کثیرزارع
        </Typography>
      </Stack>
      <Divider />
      <AdminSidenavMenu />
    </Drawer>
  );
}

export default AdminSidenav;
