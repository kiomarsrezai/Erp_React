import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import {
  proposalConfig,
  proposalModal1EditConfig,
} from "config/features/budget/proposal-config";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";

interface SepratorFixCodeModalProos {
  initialData: GetSingleSepratorItemShape;
  onDoneTask: () => void;
  formData: any;
  coding: any;
}

function SepratorFixCodeModal(props: SepratorFixCodeModalProos) {
  const { initialData, onDoneTask, formData, coding } = props;

  // form manage
  const editFormSchema = yup.object({
    code: yup.number().required(),
    description: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const queryClient = useQueryClient();
  const baseDataMutation = useMutation(sepratorBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.seprator.getData, data);
      onDoneTask();
    },
  });

  const editMutation = useMutation(sepratorBudgetApi.fixCodeUpdate, {
    onSuccess: () => {
      baseDataMutation.mutate(formData);
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const onSubmitHandler = (values: any) => {
    editMutation.mutate({
      ...formData,
      codingId: coding,
      code: String(values.code),
      description: values.description,
    });
  };

  return (
    <Box p={2} component="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid
        container
        columnSpacing={1}
        rowSpacing={2}
        justifyContent={"center"}
      >
        <Grid item sm={12}>
          <TextField
            id="code-input"
            label="کد بودجه"
            variant="outlined"
            size="small"
            type="number"
            {...register("code")}
            error={!!errors.code}
            helperText={(errors.code?.message || "") as any}
            defaultValue={initialData.code}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item sm={12}>
          <TextField
            id="description-input"
            label="شرح بودجه"
            variant="outlined"
            multiline
            size="small"
            {...register("description")}
            error={!!errors["description"]}
            helperText={(errors.description?.message || "") as any}
            defaultValue={initialData.description}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item lg={12}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={editMutation.isLoading || baseDataMutation.isLoading}
          >
            ویرایش
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SepratorFixCodeModal;
