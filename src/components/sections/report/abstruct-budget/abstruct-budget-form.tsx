import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import YearInput from "components/sections/inputs/year-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import BudgetKindInput from "components/sections/inputs/budget-kind-input";

import { FormEvent, useEffect, useState } from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { organItems } from "config/features/general-fields-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { abstructBudgetApi } from "api/report/abstruct-budget-api";
import {
  checkHavePermission,
  filedItemsGuard,
  joinPermissions,
} from "helper/auth-utils";

interface RevenueChartFormProps {
  formData: any;
  setFormData: (prevState: any) => void;
}
function AbstructBudgetForm(props: RevenueChartFormProps) {
  const { formData, setFormData } = props;
  const userLicenses = userStore((state) => state.permissions);

  // form
  const queryClient = useQueryClient();

  const submitMutation = useMutation(abstructBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.report.abstruct.getData, data);
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.FIELD_YEAR,
        accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE_KIND,
        accessNamesConfig.FIELD_ORGAN,
      ],
      accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        abstructBudgetConfig.YEAR,
        abstructBudgetConfig.ORGAN,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.report.abstruct.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  return (
    <>
      <Box component="form" padding={0} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE,
              accessNamesConfig.FIELD_ORGAN,
            ])}
          >
            <Grid xs={2}>
              <FlotingLabelSelect
                label="سازمان"
                name={revenueChartFormConfig.ORGAN}
                items={filedItemsGuard(
                  organItems,
                  userLicenses,
                  joinPermissions([
                    accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE,
                    accessNamesConfig.FIELD_ORGAN,
                  ])
                )}
                value={formData[abstructBudgetConfig.ORGAN]}
                setter={setFormData}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid xs={2}>
              <YearInput
                setter={setFormData}
                value={formData[abstructBudgetConfig.YEAR] as number}
                permissionForm={
                  accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE
                }
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE,
              accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE_KIND,
            ])}
          >
            <Grid xs={2}>
              <BudgetKindInput
                setter={setFormData}
                value={formData[abstructBudgetConfig.KIND] as number}
                permissionForm={
                  accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE
                }
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <Grid xs>
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
    </>
  );
}

export default AbstructBudgetForm;
