import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import CommiteInput from "components/sections/inputs/commites-input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { mettingsProjectConfig } from "config/features/project/meetings-project-config";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { checkHaveValue } from "helper/form-utils";

function ProjectMettingsModalForm() {
  // forms
  const [formData, setFormData] = useState({
    [mettingsProjectConfig.commiteType]: undefined,
    [mettingsProjectConfig.year]: undefined,
  });

  useEffect(() => {
    queryClient.setQueryData(reactQueryKeys.project.mettings.getCommitesModal, {
      data: [],
    });
  }, [formData]);

  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(mettingsProjectApi.getCommiteModal, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        reactQueryKeys.project.mettings.getCommitesModal,
        data
      );
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        mettingsProjectConfig.commiteType,
        mettingsProjectConfig.year,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid lg={3}>
          <YearInput
            setter={setFormData}
            value={formData[mettingsProjectConfig.year]}
            showError={haveSubmitedForm}
          />
        </Grid>
        <Grid lg={3}>
          <CommiteInput
            setter={setFormData}
            value={formData[mettingsProjectConfig.commiteType]}
            showError={haveSubmitedForm}
          />
        </Grid>

        <Grid lg={4}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
          >
            نمایش
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectMettingsModalForm;
