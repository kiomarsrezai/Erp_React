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

interface CodingBudgetActionModalProps {
  onDoneTask: () => void;
  initialData?: any;
  level?: number;
  motherId?: number;
}

function CodingBudgetActionModal(props: CodingBudgetActionModalProps) {
  const { onDoneTask, initialData, level, motherId } = props;

  // form manage
  const [checkData, setCheckData] = useState({
    [codingBudgetConfig.crud]: initialData?.[codingBudgetConfig.crud] || false,
    [codingBudgetConfig.show]: initialData?.[codingBudgetConfig.show] || false,
  });

  const editFormSchema = yup.object({
    [codingBudgetConfig.code]: yup.string().required(),
    [codingBudgetConfig.description]: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const insertCodingMutation = useMutation(codingBudgetApi.insertItem, {
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

  const editCodingMutation = useMutation(codingBudgetApi.editItem, {
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
    if (initialData) {
      // edit
      const data = {
        ...values,
        ...checkData,
        [codingBudgetConfig.level]: level,
        [codingBudgetConfig.id]: initialData[codingBudgetConfig.id],
      };

      editCodingMutation.mutate({
        ...data,
      });
    } else {
      // create
      const data = {
        ...values,
        ...checkData,
        [codingBudgetConfig.mother_id]: motherId,
        [codingBudgetConfig.level]: level,
      };

      insertCodingMutation.mutate({
        ...data,
      });
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
            label="کد"
            variant="outlined"
            size="small"
            {...register(codingBudgetConfig.code)}
            error={!!errors[codingBudgetConfig.code]}
            helperText={(errors[codingBudgetConfig.code]?.message || "") as any}
            defaultValue={initialData?.[codingBudgetConfig.code] || ""}
            fullWidth
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            id="description-input"
            label="توضیحات"
            variant="outlined"
            size="small"
            {...register(codingBudgetConfig.description)}
            error={!!errors[codingBudgetConfig.description]}
            defaultValue={initialData?.[codingBudgetConfig.description] || ""}
            helperText={
              (errors[codingBudgetConfig.description]?.message || "") as any
            }
            fullWidth
          />
        </Grid>

        <Grid item sm={8}>
          <Stack direction={"row"} spacing={1}>
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
          </Stack>
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

export default CodingBudgetActionModal;
