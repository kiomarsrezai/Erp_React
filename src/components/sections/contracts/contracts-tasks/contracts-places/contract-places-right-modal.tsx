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
import { GetSingleContractPlacesItemShape } from "types/data/contracts/contracts-places-type";
import { generalFieldsConfig } from "config/features/general-fields-config";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface Props {
  onDoneTask: () => void;
  initialData?: GetSingleContractPlacesItemShape;
}

export default function ContractPlacesRightModal(props: Props) {
  const { onDoneTask, initialData } = props;

  // form manage
  const [areaValue, setAreaValue] = useState({
    [generalFieldsConfig.AREA]: initialData?.areaId || undefined,
  });

  const formSchema = yup.object({
    estateInfoAddress: yup.string().required(),
    estateInfoName: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const insertMutation = useMutation(contractsPlacesApi.insertRight, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
  });

  const editMutation = useMutation(contractsPlacesApi.editRight, {
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
        ...areaValue,
        id: initialData.id,
      };

      editMutation.mutate(data);
    } else {
      // create
      const data = {
        ...values,
        ...areaValue,
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
            label="نام"
            variant="outlined"
            size="small"
            {...register("estateInfoName")}
            error={!!errors.estateInfoName}
            helperText={(errors.estateInfoName?.message || "") as any}
            defaultValue={initialData?.estateInfoName || ""}
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item sm={8}>
          <AreaInput
            value={areaValue[generalFieldsConfig.AREA]}
            setter={setAreaValue}
            level={3}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            id="description-input"
            label="آدرس"
            variant="outlined"
            autoComplete="off"
            size="small"
            {...register("estateInfoAddress")}
            error={!!errors.estateInfoAddress}
            defaultValue={initialData?.estateInfoAddress || ""}
            helperText={(errors.estateInfoAddress?.message || "") as any}
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
