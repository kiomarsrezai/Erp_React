import BudgetSepratorCreaditorInput from "components/sections/inputs/budget-seprator-creaditor-input";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import * as yup from "yup";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";
import { GetSingleSepratorCreaditorItemShape } from "types/data/budget/seprator-creaditor-type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";

interface SepratorUpdateModalprops {
  onDoneTask: () => void;
  initialData: GetSingleSepratorCreaditorItemShape | null;
}

function SepratorUpdateModal(props: SepratorUpdateModalprops) {
  const { onDoneTask, initialData } = props;

  // form manage
  const editFormSchema = yup.object({
    [sepratorCreaditorBudgetConfig.mosavab_creaditor]: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const editMutation = useMutation(sepratorCreaditorBudgetApi.updateOne, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
  });

  const onSubmitHandler = (values: any) => {
    editMutation.mutate({
      id: initialData?.id || 0,
      [sepratorCreaditorBudgetConfig.mosavab_creaditor]:
        values[sepratorCreaditorBudgetConfig.mosavab_creaditor],
    });
  };

  return (
    <Box
      sx={{ width: "80%", mx: "auto", p: 2 }}
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <TextField
        id="code-input"
        label="مصوب"
        variant="outlined"
        size="small"
        {...register(sepratorCreaditorBudgetConfig.mosavab_creaditor)}
        error={!!errors[sepratorCreaditorBudgetConfig.mosavab_creaditor]}
        helperText={
          (errors[sepratorCreaditorBudgetConfig.mosavab_creaditor]?.message ||
            "") as any
        }
        defaultValue={initialData?.mosavab || 0}
        autoComplete="off"
        fullWidth
      />

      <LoadingButton
        variant="contained"
        sx={{ mt: 1 }}
        type="submit"
        loading={editMutation.isLoading}
      >
        ویرایش
      </LoadingButton>
    </Box>
  );
}

export default SepratorUpdateModal;
