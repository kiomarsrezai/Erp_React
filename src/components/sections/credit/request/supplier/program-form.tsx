import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { FormEvent, useState } from "react";
import SuppliersInput from "components/sections/inputs/suppliers-input";
import { suppliersApi } from "api/credit/suppliers-api";

function ProgramForm() {
  const queryClient = useQueryClient();

  const suppliersMutation = useMutation(suppliersApi.list, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.request.suppliers.list, data);
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHaveSubmitedForm(true);
    suppliersMutation.mutate(1);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          {/* <SuppliersInput
            setter={setFormData}
            value={formData[programConfig.kind]}
            showError={haveSubmitedForm}
          /> */}
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
