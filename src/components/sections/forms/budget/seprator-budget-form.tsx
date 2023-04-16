import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { sepratorBudgetFormConfig } from "config/formdata/budget/seprator-config";
import { useState, FormEvent } from "react";

function SepratoeBudgetForm() {
  const [formData, setFormData] = useState({
    [sepratorBudgetFormConfig.YEAR]: 32,
    [sepratorBudgetFormConfig.AREA]: 1,
    [sepratorBudgetFormConfig.BUDGET_METHOD]: 1,
  });

  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(sepratorBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(["budget-seprator"], data);
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
            value={formData[sepratorBudgetFormConfig.YEAR]}
          />
        </Grid>
        <Grid lg={2}>
          <AreaInput
            setter={setFormData}
            value={formData[sepratorBudgetFormConfig.AREA]}
          />
        </Grid>

        <Grid lg={2}>
          <BudgetMethodInput
            setter={setFormData}
            value={formData[sepratorBudgetFormConfig.BUDGET_METHOD]}
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
