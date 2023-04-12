import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logoImg from "assets/images/logos/fava.svg";

import { useState } from "react";

function LoginForm() {
  const [showPasword, setShowPassword] = useState(false);
  const toggleSeePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      <Box>
        <Box
          component="img"
          sx={{
            height: 150,
            width: 150,
          }}
          alt="fava-ahvaz"
          src={logoImg}
        />
      </Box>
      <Box>
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
              type={showPasword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleSeePassword}>
                      {showPasword ? (
                        <RemoveRedEyeIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography variant="body2">مرا به خاطر بسپار</Typography>
                }
              />
            </FormGroup>
          </Stack>

          <Stack spacing={1}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              href="/report/chart/revenue"
            >
              ورود
            </Button>

            <Box>
              <Link
                href="#"
                underline="hover"
                variant="caption"
                sx={{ color: "grey.600" }}
              >
                فراموشی رمز ورود
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginForm;
