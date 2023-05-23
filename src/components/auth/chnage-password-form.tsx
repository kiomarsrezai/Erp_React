import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import * as yup from "yup";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePasswordConfig } from "config/features/auth/auth-config";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "api/auth/auth-api";
import userStore from "hooks/store/user-store";
import { globalConfig } from "config/global-config";
import { enqueueSnackbar } from "notistack";

function ChnagePasswordForm() {
  const [showPasswordMain, setShowPasswordMain] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  //   form
  const loginFormSchema = yup.object({
    [changePasswordConfig.password]: yup.string().required().min(6),
    [changePasswordConfig.new_password]: yup.string().required().min(6),
    [changePasswordConfig.new_password_again]: yup
      .string()
      .required()
      .min(6)
      .oneOf(
        [yup.ref(changePasswordConfig.new_password)],
        "باید با فیلد رمز ورود جدید یکسان باشد"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  // submit
  const changePassword = useMutation(AuthApi.changePassword, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        //variant: "error",
      //});
    },
  });

  const userId = userStore((state) => state.id);

  const submitHandler = (values: any) => {
    changePassword.mutate({
      [changePasswordConfig.userId]: userId,
      [changePasswordConfig.password]: values[changePasswordConfig.password],
      [changePasswordConfig.new_password]:
        values[changePasswordConfig.new_password],
      [changePasswordConfig.new_password_again]:
        values[changePasswordConfig.new_password_again],
    });
  };

  return (
    <Box component="form" padding={3} onSubmit={handleSubmit(submitHandler)}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid lg={7}>
          <TextField
            id="username-input"
            label="رمز ورود"
            variant="outlined"
            {...register(changePasswordConfig.password)}
            error={!!errors[changePasswordConfig.password]}
            helperText={
              (errors[changePasswordConfig.password]?.message || "") as any
            }
            fullWidth
          />
        </Grid>
        <Grid lg={7}>
          <TextField
            id="password-input"
            label="رمز ورود جدید"
            variant="outlined"
            {...register(changePasswordConfig.new_password)}
            error={!!errors[changePasswordConfig.new_password]}
            helperText={
              (errors[changePasswordConfig.new_password]?.message || "") as any
            }
            type={showPasswordMain ? "text" : "password"}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordMain((state) => !state)}
                  >
                    {showPasswordMain ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid lg={7}>
          <TextField
            id="repeat-password-input"
            label="تکرار رمز جدید"
            variant="outlined"
            {...register(changePasswordConfig.new_password_again)}
            error={!!errors[changePasswordConfig.new_password_again]}
            helperText={
              (errors[changePasswordConfig.new_password_again]?.message ||
                "") as any
            }
            type={showPasswordRepeat ? "text" : "password"}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordRepeat((state) => !state)}
                  >
                    {showPasswordRepeat ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid lg={7}>
          <Button variant="contained" color="primary" type="submit">
            تایید
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChnagePasswordForm;
