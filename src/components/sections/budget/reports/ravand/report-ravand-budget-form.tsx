import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import LoadingButton from "@mui/lab/LoadingButton";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import AreaInput from "components/sections/inputs/area-input";
import { ravandChartConfig } from "config/features/report/chart/ravand-chart-config";
import { ravandChartApi } from "api/report/ravand-chart-api";

interface ReportRavandBudgetFormProps {
  formData: any;
  setFormData: (prevState: any) => void;
  inputRender?: ReactNode;
  tabRender?: ReactNode;
}
function ReportRavandBudgetForm(props: ReportRavandBudgetFormProps) {
  const { formData, setFormData, inputRender, tabRender } = props;
  const userLicenses = userStore((state) => state.permissions);

  // form
  const queryClient = useQueryClient();

  const submitMutation = useMutation(ravandChartApi.getChart, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.report.chart.ravand, data);
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [accessNamesConfig.FIELD_AREA, accessNamesConfig.FIELD_BUDGET_METHOD],
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
      ])
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        ravandChartConfig.area,
        ravandChartConfig.budget_method,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.report.chart.ravand, {
      data: [[], [], [], []],
    });
  }, [formData, queryClient]);

  return (
    <Box component="form" padding={2} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {tabRender && <Grid xs={12}>{tabRender}</Grid>}
        {inputRender && <Grid xs={2}>{inputRender}</Grid>}

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
            accessNamesConfig.FIELD_AREA,
          ])}
        >
          <Grid lg={2}>
            <AreaInput
              setter={setFormData}
              value={formData[ravandChartConfig.area]}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
              ])}
              level={3}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
            accessNamesConfig.FIELD_BUDGET_METHOD,
          ])}
        >
          <Grid xs={2}>
            <BudgetMethodInput
              setter={setFormData}
              value={formData[revenueChartFormConfig.BUDGET_METHOD] as number}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
              ])}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <Grid xs={2}>
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

export default ReportRavandBudgetForm;
