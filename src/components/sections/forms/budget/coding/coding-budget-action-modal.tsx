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

interface CodingBudgetActionModalProps {
  onDoneTask: (data: any) => void;
  initialData?: any;
}

function CodingBudgetActionModal(props: CodingBudgetActionModalProps) {
  const { onDoneTask, initialData } = props;

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

  const onSubmitHandler = (values: any) => {
    onDoneTask(values);
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
