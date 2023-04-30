import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import useLayoutStore from "hooks/store/layout-store";
import PasswordIcon from "@mui/icons-material/Password";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FixedModal from "components/ui/modal/fixed-modal";
import ChnagePasswordForm from "pages/auth/chnage-password-form";

function AdminHeader() {
  const toggleNormlize = useLayoutStore((state) => state.toggleNormlize);

  // sign out
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token-auth");
    navigate("/");
  };

  // change password
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    useState(false);
  const handleOpenChangePasswordModal = () => {
    setIsOpenChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setIsOpenChangePasswordModal(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleNormlize}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            سامانه ERP
            <Typography variant="caption" sx={{ ml: 1 }}>
              ( سازمان فاوا اهواز )
            </Typography>
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleOpenChangePasswordModal}>
            <PasswordIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleSignOut}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <FixedModal
        open={isOpenChangePasswordModal}
        handleClose={handleCloseChangePasswordModal}
        title="عوض کردن رمز ورود"
      >
        <ChnagePasswordForm />
      </FixedModal>
    </>
  );
}

export default AdminHeader;
