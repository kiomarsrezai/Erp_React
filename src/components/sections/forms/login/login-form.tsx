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

import { FormEvent, useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // password
  const [showPasword, setShowPassword] = useState(false);
  const toggleSeePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
              id="username-input"
              label="نام کاربری"
              variant="outlined"
              value={formData.email}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
              fullWidth
            />

            <TextField
              id="password-input"
              label="رمز ورود"
              variant="outlined"
              value={formData.password}
              type={showPasword ? "text" : "password"}
              fullWidth
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
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
