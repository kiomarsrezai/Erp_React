import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { creditRequestTableConfig } from "config/features/credit/credit-request-config";

interface CreditRequestTableActionModalProps {
  onDoneTask: (data: any) => void;
}

function CreditRequestTableActionModal(
  props: CreditRequestTableActionModalProps
) {
  const { onDoneTask } = props;

  // form manage
  const editFormSchema = yup.object({
    [creditRequestTableConfig.description]: yup.string().required(),
    [creditRequestTableConfig.others_description]: yup.string().required(),
    [creditRequestTableConfig.scale]: yup.string().required(),
    [creditRequestTableConfig.price]: yup.number().required(),
    [creditRequestTableConfig.quantity]: yup.number().required(),
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
      <Grid container columnSpacing={1} rowSpacing={2}>
        <Grid item sm={6}>
          <TextField
            id="price-input"
            label="واحد"
            variant="outlined"
            size="small"
            {...register(creditRequestTableConfig.scale)}
            error={!!errors[creditRequestTableConfig.scale]}
            helperText={
              (errors[creditRequestTableConfig.scale]?.message || "") as any
            }
            fullWidth
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="price-input"
            label="تعداد / مقدار"
            variant="outlined"
            size="small"
            {...register(creditRequestTableConfig.quantity)}
            error={!!errors[creditRequestTableConfig.quantity]}
            helperText={
              (errors[creditRequestTableConfig.quantity]?.message || "") as any
            }
            fullWidth
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="price-input"
            label="نرخ"
            variant="outlined"
            size="small"
            {...register(creditRequestTableConfig.price)}
            error={!!errors[creditRequestTableConfig.price]}
            helperText={
              (errors[creditRequestTableConfig.price]?.message || "") as any
            }
            fullWidth
          />
        </Grid>

        <Grid item sm={6}>
          <TextField
            id="description-input"
            label="شرح کوتاه"
            variant="outlined"
            size="small"
            {...register(creditRequestTableConfig.description)}
            error={!!errors[creditRequestTableConfig.description]}
            helperText={
              (errors[creditRequestTableConfig.description]?.message ||
                "") as any
            }
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="more-description-input"
            label="شرح"
            variant="outlined"
            size="small"
            {...register(creditRequestTableConfig.others_description)}
            error={!!errors[creditRequestTableConfig.others_description]}
            helperText={
              (errors[creditRequestTableConfig.others_description]?.message ||
                "") as any
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

export default CreditRequestTableActionModal;
