import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { FormEvent, useEffect } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";

interface SepratoeBudgetFormProps {
  formData: any;
  setFormData: any;
}
function SepratoeBudgetForm(props: SepratoeBudgetFormProps) {
  const { formData, setFormData } = props;

  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(sepratorBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.seprator.getData, data);
    },
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitMutation.mutate(formData);
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.seprator.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid lg={2}>
          <YearInput
            setter={setFormData}
            value={formData[sepratorBudgetConfig.YEAR]}
          />
        </Grid>
        <Grid lg={2}>
          <AreaInput
            setter={setFormData}
            value={formData[sepratorBudgetConfig.AREA]}
          />
        </Grid>

        <Grid lg={2}>
          <BudgetMethodInput
            setter={setFormData}
            value={formData[sepratorBudgetConfig.BUDGET_METHOD]}
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

export default SepratoeBudgetForm;
