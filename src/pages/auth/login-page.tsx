import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import karroonImg from "assets/images/places/karoon.jpg";
import LoginForm from "components/forms/login/login-form";

function LoginPage() {
  return (
    <Grid container spacing={0} overflow="hidden">
      <Grid xs={4} lg={3} sx={{ bgcolor: "grey.100" }}>
        <LoginForm />
      </Grid>
      <Grid xs={8} lg={9}>
        <Box
          component="img"
          boxShadow={2}
          sx={{
            height: 1,
            width: 1,
          }}
          alt="karoon-ahvaz"
          src={karroonImg}
        />
      </Grid>
    </Grid>
  );
}

export default LoginPage;
