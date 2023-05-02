import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import defaultProfileImg from "assets/images/default-profile.png";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import AddIcon from "@mui/icons-material/Add";
import FixedModal from "components/ui/modal/fixed-modal";
import SelectUser from "components/sections/select-user";

import { useState } from "react";

interface OrganizationPostsOrgUserListModalProps {
  title: string;
}

function OrganizationPostsOrgUserListModal(
  props: OrganizationPostsOrgUserListModalProps
) {
  const { title } = props;
  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);

  return (
    <>
      <Stack p={2} spacing={1} width={"70%"} marginX="auto">
        <Box>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setIsOpenAddUserModal(true)}
          >
            <AddIcon />
          </Button>
        </Box>
        <Card sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}>
          <CardContent sx={{ padding: "16px !important" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar src={defaultProfileImg}>H</Avatar>
                <Typography variant="body1">علیرضا کثیرزارع</Typography>
                <Typography variant="caption" color="GrayText">
                  ( برنامه نویس فاوا )
                </Typography>
              </Stack>
              <IconButton color="error" size="small" onClick={() => {}}>
                <DeleteSharpIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}>
          <CardContent sx={{ padding: "16px !important" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar src={defaultProfileImg}>H</Avatar>
                <Typography variant="body1">علیرضا کثیرزارع</Typography>
                <Typography variant="caption" color="GrayText">
                  ( برنامه نویس فاوا )
                </Typography>
              </Stack>
              <IconButton color="error" size="small" onClick={() => {}}>
                <DeleteSharpIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}>
          <CardContent sx={{ padding: "16px !important" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar src={defaultProfileImg}>H</Avatar>
                <Typography variant="body1">علیرضا کثیرزارع</Typography>
                <Typography variant="caption" color="GrayText">
                  ( برنامه نویس فاوا )
                </Typography>
              </Stack>
              <IconButton color="error" size="small" onClick={() => {}}>
                <DeleteSharpIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <FixedModal
        open={isOpenAddUserModal}
        handleClose={() => setIsOpenAddUserModal(false)}
        title={`افزودن شخص - ${title}`}
      >
        <Box p={3}>
          <SelectUser onSelectUser={() => {}} />
        </Box>
      </FixedModal>
    </>
  );
}

export default OrganizationPostsOrgUserListModal;
