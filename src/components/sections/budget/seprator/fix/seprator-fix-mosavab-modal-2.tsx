import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
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
import {
  GetSingleSepratorItemShape,
  GetSingleSepratorMosavabItemShape,
} from "types/data/budget/seprator-type";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";

interface SepratorFixMosavabModal2Proos {
  initialData: GetSingleSepratorMosavabItemShape;
  onDoneTask: (code: string) => void;
  formData: any;
}

function SepratorFixMosavabModal2(props: SepratorFixMosavabModal2Proos) {
  const { initialData, onDoneTask, formData } = props;

  // form manage
  const editFormSchema = yup.object({
    mosavab: yup.number().required(),
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
      const values = getValues();
      queryClient.setQueryData(reactQueryKeys.budget.seprator.getData, data);
      onDoneTask(String(values.code));
    },
  });

  const editMutation = useMutation(sepratorBudgetApi.fixMosavabUpdate, {
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
      budgetDetailId: initialData.budgetDetailId,
      budgetDetailProjectId: initialData.budgetDetailProjectId,
      budgetDetailProjectAreaId: initialData.budgetDetailProjectAreaId,
      mosavab: values.mosavab,
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
            label="مصوب"
            variant="outlined"
            size="small"
            type="number"
            {...register("mosavab")}
            error={!!errors.mosavab}
            helperText={(errors.mosavab?.message || "") as any}
            defaultValue={initialData.mosavabPublic}
            autoComplete="off"
            fullWidth
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

export default SepratorFixMosavabModal2;
