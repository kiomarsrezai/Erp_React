import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import logoImg from "assets/images/logos/fava.svg";

function LoginForm() {
  return (
    <Box
      paddingLeft={5}
      paddingRight={5}
      textAlign="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <Box
          component="img"
          sx={{
            height: 150,
            width: 150,
          }}
          alt="fava-ahvaz"
          src={logoImg}
        />
      </div>

      <div>
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

            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="مرا به خاطر بسپار"
              />
            </FormGroup>
          </Stack>

          <Stack spacing={1}>
            <Button variant="contained" fullWidth size="large">
              ورود
            </Button>

            <Box>
              <Link href="#">فزاموشی رمز ورود</Link>
            </Box>
          </Stack>
        </Stack>
      </div>
    </Box>
  );
}

export default LoginForm;
