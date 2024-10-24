import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { forgetPasswordConfig } from "config/features/auth/auth-config";

function ForgetPasswordModal() {
  // form
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
        <div className="flex flex-col">
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
          <div className="py-2"></div>
          <Button variant="contained" color="primary" type="submit" className="w-full">
            تایید
          </Button>
        </div>
    </Box>
  );
}

export default ForgetPasswordModal;
