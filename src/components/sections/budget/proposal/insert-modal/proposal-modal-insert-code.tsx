import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CheckboxLabeled from "components/ui/inputs/checkbox-labeled";
import * as yup from "yup";
import SearchIcon from "@mui/icons-material/Search";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { codingBudgetConfig } from "config/features/budget/coding-config";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { codingBudgetApi } from "api/budget/coding-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import AreaInput from "components/sections/inputs/area-input";

interface ProposalModalInsertCodeProos {}

function ProposalModalInsertCode(props: ProposalModalInsertCodeProos) {
  const {} = props;

  const formSchema = yup.object({
    [codingBudgetConfig.code]: yup.string().required(),
    [codingBudgetConfig.description]: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitHandler = (values: any) => {
    const data = {};

    insertCodingMutation.mutate({
      ...data,
    });
  };

  const insertCodingMutation = useMutation(codingBudgetApi.insertItem, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      // onDoneTask();
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

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
            id="code-input"
            label="کد"
            variant="outlined"
            size="small"
            {...register(codingBudgetConfig.code)}
            error={!!errors[codingBudgetConfig.code]}
            helperText={(errors[codingBudgetConfig.code]?.message || "") as any}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="code-input"
            label="مصوب"
            variant="outlined"
            type="number"
            size="small"
            autoComplete="off"
            fullWidth
            {...register(codingBudgetConfig.code)}
            error={!!errors[codingBudgetConfig.code]}
            helperText={(errors[codingBudgetConfig.code]?.message || "") as any}
          />
        </Grid>
        <Grid item sm={6}>
          <AreaInput
            setter={() => {}}
            value={undefined}
            // setter={setFormData}
            // value={formData[proposalConfig.AREA]}
            // showError={haveSubmitedForm}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="project-input"
            label="پروژه"
            variant="outlined"
            value={undefined}
            size="small"
            // error={
            //   !formData[creditRequestConfig.contractorName] && haveSubmitedForm
            // }
            // helperText={
            //   !formData[creditRequestConfig.contractorName] &&
            //   haveSubmitedForm &&
            //   globalConfig.ERROR_NO_EMPTY
            // }
            // sx={{
            //   "& fieldset": {
            //     ...(!formData[creditRequestConfig.contractorName] &&
            //       haveSubmitedForm && {
            //         borderColor: `${red[600]} !important`,
            //       }),
            //   },
            // }}
            disabled
            // InputLabelProps={{
            //   shrink: !!formData[creditRequestConfig.contractorName],
            // }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => {}} size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            multiline
            rows={4}
            id="description-input"
            label="شرح"
            variant="outlined"
            autoComplete="off"
            size="small"
            {...register(codingBudgetConfig.description)}
            error={!!errors[codingBudgetConfig.description]}
            helperText={
              (errors[codingBudgetConfig.description]?.message || "") as any
            }
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

export default ProposalModalInsertCode;
