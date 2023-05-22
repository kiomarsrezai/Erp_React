import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import FixedModal from "components/ui/modal/fixed-modal";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { accessNamesConfig } from "config/access-names-config";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import { proposalConfig } from "config/features/budget/proposal-config";
import { connectBudgetApi } from "api/budget/budget-connect-api";

interface BudgetConnectFormProps {
  formData: any;
  setFormData: any;
}

function BudgetConnectForm(props: BudgetConnectFormProps) {
  const { formData, setFormData } = props;

  const userLicenses = userStore((state) => state.permissions);

  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(connectBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.connect.getData, data);
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
      accessNamesConfig.BUDGET__ENTESAB_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        proposalConfig.YEAR,
        proposalConfig.BUDGET_METHOD,
        proposalConfig.AREA,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.connect.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__ENTESAB_PAGE,
            accessNamesConfig.FIELD_YEAR,
          ])}
        >
          <Grid lg={2}>
            <YearInput
              setter={setFormData}
              value={formData[proposalConfig.YEAR]}
              permissionForm={accessNamesConfig.BUDGET__ENTESAB_PAGE}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__ENTESAB_PAGE,
            accessNamesConfig.FIELD_AREA,
          ])}
        >
          <Grid lg={2}>
            <AreaInput
              setter={setFormData}
              value={formData[proposalConfig.AREA]}
              permissionForm={accessNamesConfig.BUDGET__ENTESAB_PAGE}
              level={3}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__ENTESAB_PAGE,
            accessNamesConfig.FIELD_BUDGET_METHOD,
          ])}
        >
          <Grid lg={2}>
            <BudgetMethodInput
              setter={setFormData}
              value={formData[proposalConfig.BUDGET_METHOD]}
              permissionForm={accessNamesConfig.BUDGET__ENTESAB_PAGE}
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default BudgetConnectForm;
