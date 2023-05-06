import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import TrazKindInput from "../inputs/traz-kind-input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { trazApi } from "api/traz/traz-api";
import { trazConfig } from "config/features/traz/traz-config";

interface TrazFormProps {
  formData: any;
  setFormData: any;
}

function TrazForm(props: TrazFormProps) {
  const { formData, setFormData } = props;

  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(trazApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.traz.getData, data);
    },
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitMutation.mutate(formData);
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.traz.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid lg={2}>
          <YearInput setter={setFormData} value={formData[trazConfig.YEAR]} />
        </Grid>

        <Grid lg={2}>
          <AreaInput setter={setFormData} value={formData[trazConfig.AREA]} />
        </Grid>
        <Grid lg={2}>
          <TrazKindInput
            setter={setFormData}
            value={formData[trazConfig.kind]}
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

export default TrazForm;
