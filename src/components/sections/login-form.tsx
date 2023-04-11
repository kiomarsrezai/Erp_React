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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logoImg from "assets/images/logos/fava.svg";

import { useState } from "react";

function LoginForm() {
  const [seePasword, setSeePassword] = useState(false);
  const toggleSeePassword = () => {
    setSeePassword((prevState) => !prevState);
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
              type={seePasword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleSeePassword}>
                      {seePasword ? (
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
                label="مرا به خاطر بسپار"
              />
            </FormGroup>
          </Stack>

          <Stack spacing={1}>
            <Button variant="contained" fullWidth size="large">
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
