import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { orgPostsApi } from "api/organizition/posts-otg-api";
import { orgPostsConfig } from "config/features/orginization/posts-config";

interface PostsOrgEditModalProps {
  onDoneTask: () => void;
  itemData: any;
}
function PostsOrgEditModal(props: PostsOrgEditModalProps) {
  const { itemData, onDoneTask } = props;

  const updateMutation = useMutation(orgPostsApi.updateProject, {
    onSuccess: () => {
      onDoneTask();
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  // form manage
  const editFormSchema = yup.object({
    [orgPostsConfig.title]: yup.string().required(),
    [orgPostsConfig.code]: yup.string().required(),
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
            {...register(orgPostsConfig.title)}
            error={!!errors[orgPostsConfig.title]}
            helperText={(errors[orgPostsConfig.title]?.message || "") as any}
            defaultValue={itemData[orgPostsConfig.title]}
            fullWidth
          />
        </Grid>
        <Grid lg={3}>
          <TextField
            id="code-input"
            label="کد"
            variant="outlined"
            {...register(orgPostsConfig.code)}
            error={!!errors[orgPostsConfig.code]}
            helperText={(errors[orgPostsConfig.code]?.message || "") as any}
            defaultValue={itemData[orgPostsConfig.code]}
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

export default PostsOrgEditModal;
