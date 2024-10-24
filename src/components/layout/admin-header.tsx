import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useLayoutStore from "hooks/store/layout-store";
import FixedModal from "components/ui/modal/fixed-modal";
import ChnagePasswordForm from "components/auth/chnage-password-form";
import userStore from "hooks/store/user-store";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {globalConfig} from "../../config/global-config";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PasswordIcon from '@mui/icons-material/Password';

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

  // notification
  const [anchorNotification, setAnchorNotification] =
    useState<HTMLButtonElement | null>(null);
  const handleClickNotification = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorNotification(event.currentTarget);
  };

  const closeNotifications = () => {
    setAnchorNotification(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            display={"flex"}
            alignItems={"center"}
            width={1}
            justifyContent={"space-between"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
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
              <Typography variant="h6" component="div">
                {globalConfig.siteTitle}
                <Typography variant="caption" sx={{ ml: 1 }}>
                  ( سازمان فاوا اهواز )
                </Typography>
              </Typography>
            </Box>

            {/*<Box*/}
            {/*  component={"img"}*/}
            {/*  src={logoImg}*/}
            {/*  alt="logo"*/}
            {/*  height={"55px"}*/}
            {/*  sx={{ bgcolor: alpha(grey[100], 0.3), borderRadius: 2 }}*/}
            {/*/>*/}

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              {/*<>*/}
              {/*  <span style={{paddingLeft: '16px'}}>v {globalConfig.version}</span>*/}
              {/*  <IconButton color="inherit" onClick={handleClickNotification}>*/}
              {/*    <Badge*/}
              {/*      badgeContent={423}*/}
              {/*      color="error"*/}
              {/*      anchorOrigin={{ horizontal: "left", vertical: "top" }}*/}
              {/*    >*/}
              {/*      <NotificationsIcon />*/}
              {/*    </Badge>*/}
              {/*  </IconButton>*/}
              {/*  <Notifications*/}
              {/*    anchorEl={anchorNotification}*/}
              {/*    onClose={closeNotifications}*/}
              {/*  />*/}
              {/*</>*/}

              <IconButton
                color="inherit"
                onClick={handleOpenChangePasswordModal}
              >
                <PasswordIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => setConfrimSignoutModal(true)}
              >
                <ExitToAppIcon/>
              </IconButton>
            </Box>
          </Box>
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
        title="تغییر رمز ورود"
        maxWidth="sm"
        maxHeight="50%"
      >
        <ChnagePasswordForm onClose={handleCloseChangePasswordModal} />
      </FixedModal>
    </>
  );
}

export default AdminHeader;
