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
import * as yup from "yup";

import { useState } from "react";
import { loginConfig } from "config/features/auth/auth-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "api/auth/auth-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import userStore from "hooks/store/user-store";

function LoginForm() {
  const loginFormSchema = yup.object({
    [loginConfig.username]: yup.string().required(),
    [loginConfig.password]: yup.string().required().min(6),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  // password
  const [showPasword, setShowPassword] = useState(false);
  const toggleSeePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  // submit
  const navigate = useNavigate();
  const chnageUserData = userStore((state) => state.chnageUserData);
  const [rememberMe, setRememberMe] = useState(true);

  const loginMutation = useMutation(AuthApi.login, {
    onSuccess: (data) => {
      if (data.data) {
        chnageUserData({
          firstName: data.data.firstName,
          userName: data.data.userName,
          lastName: data.data.lastName,
        });
        if (rememberMe) {
          localStorage.setItem("token-auth", data.data.token);
        }
        navigate("/report/chart/revenue");
      } else {
        const message = "نام کاربری یا رمز ورود اشتباه است";
        setError(loginConfig.username, { message });
        setError(loginConfig.password, { message });
      }
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

  const onSubmitHandler = (values: any) => {
    loginMutation.mutate(values);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
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
              {...register(loginConfig.username)}
              error={!!errors[loginConfig.username]}
              helperText={(errors[loginConfig.username]?.message || "") as any}
              fullWidth
            />

            <TextField
              id="password-input"
              label="رمز ورود"
              variant="outlined"
              {...register(loginConfig.password)}
              error={!!errors[loginConfig.password]}
              helperText={(errors[loginConfig.password]?.message || "") as any}
              fullWidth
              type={showPasword ? "text" : "password"}
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
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={() => setRememberMe((state) => !state)}
                  />
                }
                label={
                  <Typography variant="body2">مرا به خاطر بسپار</Typography>
                }
              />
            </FormGroup>
          </Stack>

          <Stack spacing={1}>
            <Button variant="contained" fullWidth size="large" type="submit">
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
