import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { FormEvent, useState } from "react";
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

  const [dataUpdateFormData, setDataUpdateFormData] = useState(itemData);

  const updateMutation = useMutation(orgProjectApi.updateProject, {
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

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      ...dataUpdateFormData,
    });
  };

  return (
    <Box p={2} component="form" onSubmit={handleModalSubmit}>
      <Grid container spacing={1}>
        <Grid lg={3}>
          <TextField
            id="title-input"
            label="عنوان"
            variant="outlined"
            value={dataUpdateFormData[orgProjectConfig.title]}
            onChange={(e) => {
              setDataUpdateFormData((prevState: any) => ({
                ...prevState,
                [orgProjectConfig.title]: e.target.value,
              }));
            }}
            fullWidth
          />
        </Grid>
        <Grid lg={3}>
          <TextField
            id="code-input"
            label="کد"
            variant="outlined"
            value={dataUpdateFormData[orgProjectConfig.code]}
            onChange={(e) => {
              setDataUpdateFormData((prevState: any) => ({
                ...prevState,
                [orgProjectConfig.code]: e.target.value,
              }));
            }}
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
