import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import grey from "@mui/material/colors/grey";
import CheckIcon from "@mui/icons-material/Check";
import defaultProfileImg from "assets/images/default-profile.png";
import BoxLoading from "components/ui/loading/box-loading";

import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "api/auth/auth-api";
import { useEffect, useState } from "react";
import { UserItemShape } from "types/data/auth/users-type";

interface SelectUserProps {
  onSelectUser: (user: UserItemShape) => void;
}

function SelectUser(props: SelectUserProps) {
  const { onSelectUser } = props;

  const [searchText, setSearchText] = useState("");
  const usersMutation = useMutation(AuthApi.userList);

  useEffect(() => {
    if (searchText) {
      usersMutation.mutate(searchText);
    }
  }, [searchText]);

  return (
    <Box sx={{ width: 700, mx: "auto" }}>
      <TextField
        id="user-input"
        label="جستجوی کاربر"
        variant="filled"
        size="small"
        onChange={(e) => setSearchText(e.target.value)}
        autoComplete="off"
        fullWidth
      />
      {usersMutation.isLoading ? (
        <BoxLoading />
      ) : (
        <Stack spacing={1} mt={3}>
          {!!searchText &&
            usersMutation.data?.data.map((user, i) => (
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

export default SelectUser;
