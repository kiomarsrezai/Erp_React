import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { FormEvent, useEffect } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { proposalBudgetApi } from "api/budget/proposal-api";

interface ProposalBudgetFormProps {
  formData: any;
  setFormData: any;
}

function ProposalBudgetForm(props: ProposalBudgetFormProps) {
  const { formData, setFormData } = props;

  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(proposalBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.proposal.getData, data);
    },
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitMutation.mutate(formData);
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.proposal.getData, {
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

export default ProposalBudgetForm;