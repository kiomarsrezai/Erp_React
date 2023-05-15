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

interface CodingBudgetActionModalProps {
  onDoneTask: (data: any) => void;
  actionType: "edit" | "create";
}

function CodingBudgetActionModal(props: CodingBudgetActionModalProps) {
  const { onDoneTask, actionType } = props;

  // form manage
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
              name={""}
              value={false}
              setter={() => {}}
            />

            <CheckboxLabeled
              label="crud"
              name={""}
              value={false}
              setter={() => {}}
            />
          </Stack>
        </Grid>

        <Grid item lg={8}>
          <Button variant="contained" type="submit">
            {actionType === "create" ? "افزودن" : "ویرایش"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CodingBudgetActionModal;
