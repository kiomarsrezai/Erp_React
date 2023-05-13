import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import { creditRequestApi } from "api/credit/credit-request-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { FormEvent } from "react";

function SuppliersForm() {
  const queryClient = useQueryClient();

  const suppliersMutation = useMutation(creditRequestApi.suppliersList, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.request.suppliers.list, data);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    suppliersMutation.mutate(1);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={4}>input</Grid>
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
