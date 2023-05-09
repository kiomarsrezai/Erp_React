import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import useLayoutStore from "hooks/store/layout-store";
import FixedModal from "components/ui/modal/fixed-modal";
import ChnagePasswordForm from "components/auth/chnage-password-form";
import KeyIcon from "@mui/icons-material/Key";
import userStore from "hooks/store/user-store";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

function AdminHeader() {
  const toggleNormalize = useLayoutStore((state) => state.toggleNormalize);

  // sign out
  const [confrimSignoutModal, setConfrimSignoutModal] = useState(false);
  const removeUserData = userStore((state) => state.removeUserData);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token-auth");
    removeUserData();
    navigate("/");
  };

  const handleConfrimSignOut = () => {
    setConfrimSignoutModal(false);
    handleSignOut();
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
            onClick={toggleNormalize}
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
            <KeyIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => setConfrimSignoutModal(true)}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* sign out modal */}
      <ConfrimProcessModal
        open={confrimSignoutModal}
        onCancel={() => setConfrimSignoutModal(false)}
        onConfrim={handleConfrimSignOut}
        title="خروج از حساب کاربری"
      />
      {/* change password modal */}
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
