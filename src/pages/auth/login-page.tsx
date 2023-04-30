import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import karroonImg from "assets/images/places/karoon.jpg";
import LoginForm from "components/sections/forms/login/login-form";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token-auth");
    if (token) {
      navigate("/report/chart/revenue");
    }
  }, [navigate]);

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
