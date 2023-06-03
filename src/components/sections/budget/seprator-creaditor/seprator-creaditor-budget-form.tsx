import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { FormEvent, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import WindowLoading from "components/ui/loading/window-loading";
import { checkHaveValue } from "helper/form-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import userStore from "hooks/store/user-store";

interface SepratorCreaditorBudgetFormProps {
  formData: any;
  setFormData: any;
}
function SepratorCreaditorBudgetForm(props: SepratorCreaditorBudgetFormProps) {
  const { formData, setFormData } = props;
  const userLicenses = userStore((state) => state.permissions);

  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(sepratorBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.seprator.getData, data);
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.FIELD_YEAR,
        accessNamesConfig.FIELD_AREA,
        accessNamesConfig.FIELD_BUDGET_METHOD,
      ],
      accessNamesConfig.BUDGET__SEPRATOR_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        sepratorBudgetConfig.YEAR,
        sepratorBudgetConfig.BUDGET_METHOD,
        sepratorBudgetConfig.AREA,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.seprator.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  // refesh form
  const refeshFormMutation = useMutation(sepratorBudgetApi.refeshForm, {
    onSuccess: () => {
      submitMutation.mutate(formData);
    },
  });

  const handleRefeshForm = () => {
    refeshFormMutation.mutate(formData);
  };

  return (
    <>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__SEPRATOR_PAGE,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid lg={2}>
              <YearInput
                setter={setFormData}
                value={formData[sepratorBudgetConfig.YEAR]}
                permissionForm={accessNamesConfig.BUDGET__SEPRATOR_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__SEPRATOR_PAGE,
              accessNamesConfig.FIELD_AREA,
            ])}
          >
            <Grid lg={2}>
              <AreaInput
                setter={setFormData}
                value={formData[sepratorBudgetConfig.AREA]}
                permissionForm={accessNamesConfig.BUDGET__SEPRATOR_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__SEPRATOR_PAGE,
              accessNamesConfig.FIELD_BUDGET_METHOD,
            ])}
          >
            <Grid lg={2}>
              <BudgetMethodInput
                setter={setFormData}
                value={formData[sepratorBudgetConfig.BUDGET_METHOD]}
                permissionForm={accessNamesConfig.BUDGET__SEPRATOR_PAGE}
                showError={haveSubmitedForm}
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
            <Button
              variant="contained"
              type="button"
              sx={{ marginLeft: 1 }}
              onClick={handleRefeshForm}
            >
              به روز آوری
            </Button>
          </Grid>
        </Grid>
      </Box>

      <WindowLoading active={refeshFormMutation.isLoading} />
    </>
  );
}

export default SepratorCreaditorBudgetForm;
