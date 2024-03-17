import { Unstable_Grid2 as Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import SuppliersInput from "components/sections/inputs/suppliers-input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { FormEvent, useEffect, useState } from "react";
import { suppliersApi } from "api/credit/suppliers-api";
import { suppliersConfig } from "config/features/credit/suppliers-config";
import { checkHaveValue } from "helper/form-utils";

function SuppliersForm() {
  const [formData, setFormData] = useState({
    [suppliersConfig.kind]: undefined,
  });

  useEffect(() => {
    queryClient.setQueryData(reactQueryKeys.request.suppliers.list, {
      data: [],
    });
  }, [formData]);

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
    if (checkHaveValue(formData, [suppliersConfig.kind])) {
      suppliersMutation.mutate(formData[suppliersConfig.kind] || 0);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <SuppliersInput
            setter={setFormData}
            value={formData[suppliersConfig.kind]}
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

export default SuppliersForm;
