import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import defaultProfileImg from "assets/images/default-profile.png";
import { useState } from "react";

function AdminSidenavProfile() {
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
          <Typography variant="body1" fontWeight="bold" color="GrayText">
            علیرضا کثیرزارع
          </Typography>
        </Stack>
        <KeyboardArrowDownIcon color="action" />
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
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          adipisci fugiat alias cum ex praesentium quasi rerum delectus
          dignissimos, omnis,
        </Typography>
      </Popover>
    </>
  );
}

export default AdminSidenavProfile;
