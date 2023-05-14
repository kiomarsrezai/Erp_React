import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { FormEvent, useState } from "react";
import { programApi } from "api/credit/program-api";
import { programConfig } from "config/features/credit/program-config";
import AreaInput from "components/sections/inputs/area-input";
import ProgramListInput from "components/sections/inputs/list-program";

function ProgramForm() {
  const [formData, setFormData] = useState({
    [programConfig.area]: undefined,
    [programConfig.kind]: undefined,
  });
  const queryClient = useQueryClient();

  const suppliersMutation = useMutation(programApi.list, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.request.suppliers.list, data);
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHaveSubmitedForm(true);
    suppliersMutation.mutate({
      ...formData,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <AreaInput
            setter={setFormData}
            value={formData[programConfig.area]}
            showError={haveSubmitedForm}
          />
        </Grid>
        <Grid xs={4}>
          <ProgramListInput
            setter={setFormData}
            value={formData[programConfig.kind]}
            showError={haveSubmitedForm}
          />
        </Grid>
        <Grid xs={4}>
          <LoadingButton
            variant="contained"
            loading={suppliersMutation.isLoading}
            type="submit"
          >
            نمایش
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProgramForm;
