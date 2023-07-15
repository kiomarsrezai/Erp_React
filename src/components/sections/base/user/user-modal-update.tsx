import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CheckboxLabeled from "components/ui/inputs/checkbox-labeled";
import * as yup from "yup";

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

interface UserModalUpdateProps {
  initData: UserItemShape;
}

function UserModalUpdate(props: UserModalUpdateProps) {
  const { initData } = props;

  const [checkData, setCheckData] = useState({
    // [codingBudgetConfig.crud]: initialData?.[codingBudgetConfig.crud] || false,
    // [codingBudgetConfig.show]: initialData?.[codingBudgetConfig.show] || false,
  });

  const editFormSchema = yup.object({
    // [codingBudgetConfig.code]: yup.string().required(),
    [codingBudgetConfig.description]: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const onSubmitHandler = () => {};

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
          {/* <Stack direction={"row"} spacing={1}>
            <CheckboxLabeled
              label="نمایش"
              name={codingBudgetConfig.show}
              value={checkData[codingBudgetConfig.show]}
              setter={setCheckData}
            />

            <CheckboxLabeled
              label="crud"
              name={codingBudgetConfig.crud}
              value={checkData[codingBudgetConfig.crud]}
              setter={setCheckData}
            />
          </Stack> */}
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
