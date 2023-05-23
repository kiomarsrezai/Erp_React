import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orgProjectConfig } from "config/features/project/org-project-config";
import { orgProjectApi } from "api/project/org-project-api";
import { useMutation } from "@tanstack/react-query";
import { TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface ProjectOrgEditModalProps {
  onDoneTask: () => void;
  itemData: any;
}
function ProjectOrgEditModal(props: ProjectOrgEditModalProps) {
  const { itemData, onDoneTask } = props;

  const updateMutation = useMutation(orgProjectApi.updateProject, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  // form manage
  const editFormSchema = yup.object({
    [orgProjectConfig.title]: yup.string().required(),
    [orgProjectConfig.code]: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const onSubmitHandler = (values: any) => {
    updateMutation.mutate({
      ...itemData,
      ...values,
    });
  };

  return (
    <Box p={2} component="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid container spacing={1}>
        <Grid lg={3}>
          <TextField
            id="title-input"
            label="عنوان"
            variant="outlined"
            {...register(orgProjectConfig.title)}
            error={!!errors[orgProjectConfig.title]}
            helperText={(errors[orgProjectConfig.title]?.message || "") as any}
            defaultValue={itemData[orgProjectConfig.title]}
            fullWidth
          />
        </Grid>
        <Grid lg={3}>
          <TextField
            id="code-input"
            label="کد"
            variant="outlined"
            {...register(orgProjectConfig.code)}
            error={!!errors[orgProjectConfig.code]}
            helperText={(errors[orgProjectConfig.code]?.message || "") as any}
            defaultValue={itemData[orgProjectConfig.code]}
            fullWidth
          />
        </Grid>

        <Grid lg={12}>
          <Button variant="contained" type="submit">
            به روز رسانی
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectOrgEditModal;
