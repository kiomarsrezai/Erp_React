import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { proposalModal1EditConfig } from "config/features/budget/proposal-config";
import { proposalBudgetApi } from "api/budget/proposal-api";

interface ProposalModal3EditProps {
  initialData: any;
  onDoneTask: () => void;
}

function ProposalModal3Edit(props: ProposalModal3EditProps) {
  const { initialData, onDoneTask } = props;

  // form manage
  const editFormSchema = yup.object({
    [proposalModal1EditConfig.mosavab]: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const editMutation = useMutation(proposalBudgetApi.editModal3, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

  const onSubmitHandler = (values: any) => {
    editMutation.mutate({
      ...values,
      id: initialData.id,
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
        <Grid item sm={8}>
          <Typography align="center" mb={1}>
            {initialData.areaNameShort}
          </Typography>
        </Grid>
        <Grid item sm={8}>
          <TextField
            id="code-input"
            label="مصوب"
            variant="outlined"
            size="small"
            {...register(proposalModal1EditConfig.mosavab)}
            error={!!errors[proposalModal1EditConfig.mosavab]}
            helperText={
              (errors[proposalModal1EditConfig.mosavab]?.message || "") as any
            }
            defaultValue={initialData?.[proposalModal1EditConfig.mosavab] || 0}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item lg={8}>
          <Button variant="contained" type="submit">
            ویرایش
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProposalModal3Edit;
