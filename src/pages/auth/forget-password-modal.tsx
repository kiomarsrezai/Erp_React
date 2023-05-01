import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { forgetPasswordConfig } from "config/features/auth/auth-config";

function ForgetPasswordModal() {
  //   form
  const loginFormSchema = yup.object({
    [forgetPasswordConfig.phone]: yup.string().required().min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const submitHandler = (values: any) => {
    console.log(values);
  };

  return (
    <Box component="form" padding={3} onSubmit={handleSubmit(submitHandler)}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid>
          <TextField
            id="phone-input"
            label="شماره موبایل"
            variant="outlined"
            {...register(forgetPasswordConfig.phone)}
            error={!!errors[forgetPasswordConfig.phone]}
            helperText={
              (errors[forgetPasswordConfig.phone]?.message || "") as any
            }
            fullWidth
          />
        </Grid>
        <Grid>
          <Button variant="contained" color="primary" type="submit">
            تایید
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ForgetPasswordModal;
