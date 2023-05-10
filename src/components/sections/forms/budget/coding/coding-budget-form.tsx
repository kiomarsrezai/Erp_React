import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { FormEvent, useEffect } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { joinPermissions } from "helper/auth-utils";
import { codingBudgetApi } from "api/budget/coding-api";

interface CodingBudgetFormProps {
  formData: any;
  setFormData: any;
}

function CodingBudgetForm(props: CodingBudgetFormProps) {
  const { formData, setFormData } = props;

  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(codingBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.coding.getData, data);
    },
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitMutation.mutate(formData);
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.coding.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__CODING_PAGE,
            accessNamesConfig.FIELD_BUDGET_METHOD,
          ])}
        >
          <Grid lg={2}>
            <BudgetMethodInput
              setter={setFormData}
              value={formData[sepratorBudgetConfig.BUDGET_METHOD]}
              permissionForm={accessNamesConfig.BUDGET__CODING_PAGE}
            />
          </Grid>
        </SectionGuard>
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

export default CodingBudgetForm;
