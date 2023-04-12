import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import defaultProfileImg from "assets/images/default-profile.png";
import useLayoutStore from "hooks/store/layout-store";

import { useState } from "react";

function AdminSidenavProfile() {
  const normalize = useLayoutStore((state) => state.normlize);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={handleClick}
        fullWidth
      >
        <Stack
          direction="row"
          spacing={1}
          paddingBottom={0}
          sx={{ justifyContent: "start", alignItems: "center" }}
        >
          <Avatar alt="Alireza Kasirzare" src={defaultProfileImg} />
          {!normalize && (
            <Typography variant="body1" fontWeight="bold" color="GrayText">
              علیرضا کثیرزارع
            </Typography>
          )}
        </Stack>
        {!normalize && <KeyboardArrowDownIcon color="action" />}
      </Button>

      <Popover
        id={"id"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="خروج" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
}

export default AdminSidenavProfile;
