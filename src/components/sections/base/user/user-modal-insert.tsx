import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CheckboxLabeled from "components/ui/inputs/checkbox-labeled";
import * as yup from "yup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { codingBudgetConfig } from "config/features/budget/coding-config";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { codingBudgetApi } from "api/budget/coding-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { UserItemShape } from "types/data/auth/users-type";
import { DatePicker } from "@mui/x-date-pickers";
import GanderInput from "components/sections/inputs/gander-input";
import { UserApi } from "api/base/base-user";
import { convertToCalenderDate } from "helper/date-utils";

interface UserModalUpdateProps {
  onDoneTask: any;
}

function UserModalInsert(props: UserModalUpdateProps) {
  const { onDoneTask } = props;

  const [editData, setEditData] = useState({
    gender: 1,
  });

  const editFormSchema = yup.object({
    userName: yup.string().required(),
    phoneNumber: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    bio: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const editUserMutation = useMutation(UserApi.insertUser, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
  });

  const onSubmitHandler = (values: any) => {
    const data = {
      ...values,
      ...editData,
    };

    editUserMutation.mutate(data);
  };

  return (
    <Box p={2} component="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid container columnSpacing={1} rowSpacing={2}>
        <Grid item sm={6}>
          <TextField
            id="fName-input"
            label="نام"
            variant="outlined"
            size="small"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={(errors.firstName?.message || "") as any}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="lName-input"
            label="نام خانوادگی"
            variant="outlined"
            size="small"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={(errors.lastName?.message || "") as any}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item sm={6}>
          <TextField
            id="userName-input"
            label="نام کاربری"
            variant="outlined"
            size="small"
            {...register("userName")}
            error={!!errors.userName}
            helperText={(errors.userName?.message || "") as any}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item sm={6}>
          <TextField
            id="mobile-input"
            label="شماره موبایل"
            variant="outlined"
            size="small"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={(errors.phoneNumber?.message || "") as any}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item sm={6}>
          <GanderInput value={editData.gender} setter={setEditData} />
        </Grid>

        <Grid item sm={6}>
          <TextField
            id="bio-input"
            label="مسئولیت"
            variant="outlined"
            size="small"
            {...register("bio")}
            error={!!errors.bio}
            helperText={(errors.bio?.message || "") as any}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item lg={12}>
          <Button variant="contained" type="submit">
            افزودن
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserModalInsert;
