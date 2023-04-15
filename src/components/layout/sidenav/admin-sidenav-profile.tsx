import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import defaultProfileImg from "assets/images/default-profile.png";
import useLayoutStore from "hooks/store/layout-store";

function AdminSidenavProfile() {
  const normalize = useLayoutStore((state) => state.normlize);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        padding={1}
      >
        <Stack
          direction="row"
          spacing={1}
          paddingBottom={0}
          sx={{ justifyContent: "start", alignItems: "center" }}
        >
          <Avatar alt="Alireza Kasirzare" src={defaultProfileImg} />
          {!normalize && (
            <Stack alignItems="flex-start">
              <Typography variant="body1" fontWeight="bold" color="GrayText">
                علیرضا کثیرزارع
              </Typography>

              <Typography variant="caption" color="GrayText" textAlign="left">
                برنامه نویس فاوا
              </Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default AdminSidenavProfile;
