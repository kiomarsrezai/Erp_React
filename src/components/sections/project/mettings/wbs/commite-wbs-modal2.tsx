import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import BoxLoading from "components/ui/loading/box-loading";
import { useState } from "react";
import grey from "@mui/material/colors/grey";
import CheckIcon from "@mui/icons-material/Check";
import defaultProfileImg from "assets/images/default-profile.png";

interface CommiteWbsModal2Props {
  onSelectUser: (user: any) => void;
}
function CommiteWbsModal2(props: CommiteWbsModal2Props) {
  const { onSelectUser } = props;

  const usersQuery = useQuery(
    ["wbs-user-list"],
    mettingsProjectApi.getWbsUserList
  );
  const [searchText, setSearchText] = useState("");

  return (
    <Box sx={{ width: 700, mx: "auto", p: 3 }}>
      <TextField
        id="user-input"
        label="جستجوی کاربر"
        variant="filled"
        size="small"
        onChange={(e) => setSearchText(e.target.value)}
        autoComplete="off"
        fullWidth
      />

      {usersQuery.isLoading ? (
        <BoxLoading />
      ) : (
        <Stack spacing={1} mt={3}>
          {usersQuery.data?.data
            .filter(
              (user) =>
                user.firstName.includes(searchText) ||
                user.lastName.includes(searchText) ||
                user.bio.includes(searchText)
            )
            .map((user, i) => (
              <Card
                sx={{ bgcolor: grey[200], "&:hover": { bgcolor: grey[300] } }}
                key={i}
              >
                <CardContent sx={{ padding: "16px !important" }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar src={defaultProfileImg}>H</Avatar>
                      <Typography variant="body1">
                        {user.firstName} {user?.lastName}
                      </Typography>
                      <Typography variant="caption" color="GrayText">
                        ( {user?.bio} )
                      </Typography>
                    </Stack>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => onSelectUser(user)}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Stack>
      )}
    </Box>
  );
}

export default CommiteWbsModal2;
