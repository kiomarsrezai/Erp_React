import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AreaInput from "components/sections/inputs/area-input";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  GetSingleContractPlacesItemShape,
  GetSingleContractPlacesPrivateItemShape,
} from "types/data/contracts/contracts-places-type";
import { generalFieldsConfig } from "config/features/general-fields-config";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface Props {
  onDoneTask: () => void;
  initialData?: GetSingleContractPlacesPrivateItemShape;
  baseId: number;
}

export default function ContractPlacesLeftModal(props: Props) {
  const { onDoneTask, initialData, baseId } = props;

  const formSchema = yup.object({
    masahat: yup.number().required(),
    numberGhorfe: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const insertMutation = useMutation(contractsPlacesApi.insertLeft, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
  });

  const editMutation = useMutation(contractsPlacesApi.editLeft, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
  });

  const onSubmitHandler = (values: any) => {
    if (initialData) {
      // edit
      const data = {
        ...values,
        masahat: Number(values.masahat),
        id: initialData.id,
      };

      editMutation.mutate(data);
    } else {
      // create
      const data = {
        ...values,
        masahat: Number(values.masahat),
        amlakInfoId: baseId,
      };
      insertMutation.mutate(data);
    }
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
          <TextField
            id="code-input"
            label="مساحت"
            variant="outlined"
            size="small"
            {...register("masahat")}
            error={!!errors.masahat}
            helperText={(errors.masahat?.message || "") as any}
            defaultValue={initialData?.masahat || ""}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            id="description-input"
            label="شماره"
            variant="outlined"
            autoComplete="off"
            size="small"
            {...register("numberGhorfe")}
            error={!!errors.numberGhorfe}
            defaultValue={initialData?.numberGhorfe || ""}
            helperText={(errors.numberGhorfe?.message || "") as any}
            fullWidth
            multiline
          />
        </Grid>

        <Grid item lg={8}>
          <Button variant="contained" type="submit">
            {initialData ? "ویرایش" : "افزودن"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
