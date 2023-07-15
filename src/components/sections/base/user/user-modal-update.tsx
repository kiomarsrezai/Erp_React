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
  initData: UserItemShape;
  onDoneTask: any;
}

function UserModalUpdate(props: UserModalUpdateProps) {
  const { initData, onDoneTask } = props;

  const [editData, setEditData] = useState({
    isActive: initData?.isActive,
    gender: initData?.genderName === "مرد" ? 1 : 2,
    birthDate: convertToCalenderDate(initData.persianBirthDate),
  });

  const editFormSchema = yup.object({
    userName: yup.string().required(),
    phoneNumber: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    bio: yup.string().required(),
    email: yup.string().email().required(),
    // birthDate: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const editUserMutation = useMutation(UserApi.updateUser, {
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
      normalizedUserName: values.userName.toUpperCase(),
      normalizedEmail: values.email.toUpperCase(),
    };

    editUserMutation.mutate(data);
  };

  return (
    <Box p={2} component="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid
        container
        columnSpacing={1}
        rowSpacing={2}
        justifyContent={"center"}
      >
        <Grid item sm={6}>
          <TextField
            id="fName-input"
            label="نام"
            variant="outlined"
            size="small"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={(errors.firstName?.message || "") as any}
            defaultValue={initData?.firstName || ""}
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
            defaultValue={initData?.lastName || ""}
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
            defaultValue={initData?.userName || ""}
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
            defaultValue={initData?.phoneNumber || ""}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item sm={6}>
          <DatePicker
            value={new Date(editData.birthDate)} //persianBirthDate
            label="تاریخ تولد"
            onChange={(newValue: any) =>
              setEditData((state: any) => ({
                ...state,
                birthDate: newValue,
              }))
            }
            slotProps={{
              textField: { size: "small", fullWidth: true },
            }}
          />
        </Grid>

        <Grid item sm={6}>
          <GanderInput value={editData.gender} setter={setEditData} />
        </Grid>

        <Grid item sm={12}>
          <TextField
            id="bio-input"
            label="مسئولیت"
            variant="outlined"
            size="small"
            {...register("bio")}
            error={!!errors.bio}
            helperText={(errors.bio?.message || "") as any}
            defaultValue={initData?.bio || ""}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item sm={12}>
          <TextField
            id="email-input"
            label="ایمیل"
            variant="outlined"
            size="small"
            {...register("email")}
            error={!!errors.email}
            helperText={(errors.email?.message || "") as any}
            defaultValue={initData?.email || ""}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item sm={12}>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={editData.isActive}
                onChange={(e) =>
                  setEditData((prevData: any) => ({
                    ...prevData,
                    isActive: e.target.checked,
                  }))
                }
                defaultChecked
              />
            }
            label="فعال"
          />
        </Grid>

        <Grid item lg={12}>
          <Button variant="contained" type="submit">
            ویرایش
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserModalUpdate;
