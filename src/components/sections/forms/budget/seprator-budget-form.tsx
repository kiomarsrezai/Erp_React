import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { useState, FormEvent } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";

function SepratoeBudgetForm() {
  const [formData, setFormData] = useState({
    [sepratorBudgetConfig.YEAR]: 32,
    [sepratorBudgetConfig.AREA]: 1,
    [sepratorBudgetConfig.BUDGET_METHOD]: 1,
  });

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
          <Button variant="contained" type="submit">
            نمایش
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SepratoeBudgetForm;
