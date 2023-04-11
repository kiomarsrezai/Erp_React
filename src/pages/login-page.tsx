import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import karroonImg from "assets/images/places/karoon.jpg";
import logoImg from "assets/images/logos/fava.svg";

function LoginPage() {
  const handleSubmit = () => {
    alert("the backend is not ready");
  };

  const formContent = (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="نام کاربری"
          variant="outlined"
          fullWidth
        />

        <TextField
          id="outlined-basic"
          label="رمز ورود"
          variant="outlined"
          fullWidth
        />
      </Stack>

      <Button variant="contained" fullWidth onClick={handleSubmit}>
        ورود
      </Button>
    </Stack>
  );
  return (
    <Grid container spacing={0}>
      <Grid xs={3} sx={{ bgcolor: "grey.100" }}>
        <Box padding={2}>
          <Box
            component="img"
            sx={{
              height: 150,
              width: 150,
            }}
            alt="fava-ahvaz"
            src={logoImg}
          />
          {formContent}
        </Box>
      </Grid>
      <Grid xs={9}>
        <Box
          component="img"
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
