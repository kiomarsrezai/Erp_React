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
import YearInput from "components/sections/inputs/year-input";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import BudgetKindDeviationInput from "components/sections/inputs/budget-kind-deviation-input";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";

interface BudgetReportDeviationFormProps {
  formData: any;
  setFormData: (prevState: any) => void;
  inputRender?: ReactNode;
  tabRender?: ReactNode;
}

function BudgetReportDeviationForm(props: BudgetReportDeviationFormProps) {
  const { formData, setFormData, inputRender, tabRender } = props;

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
    // const havePermission = checkHavePermission(
    //   userLicenses,
    //   [accessNamesConfig.FIELD_AREA, accessNamesConfig.FIELD_BUDGET_METHOD],
    //   joinPermissions([
    //     accessNamesConfig.BUDGET__REPORT_PAGE,
    //     accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
    //   ])
    // );

    // if (!havePermission) {
    //   return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
    //     variant: "error",
    //   });
    // }

    // setHaveSubmitedForm(true);

    // if (
    //   checkHaveValue(formData, [
    //     ravandChartConfig.area,
    //     ravandChartConfig.budget_method,
    //   ])
    // ) {
    //   submitMutation.mutate(formData);
    // }
  };

  return (
    <Box
      component="form"
      padding={1}
      onSubmit={handleSubmit}
      sx={{ bgcolor: "grey.200" }}
    >
      <Grid container spacing={2}>
        {tabRender && <Grid xs={12}>{tabRender}</Grid>}
        {inputRender && <Grid xs={2}>{inputRender}</Grid>}

        {/* <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
            accessNamesConfig.FIELD_YEAR,
          ])}
        > */}
        <Grid xs={2}>
          <YearInput
            setter={setFormData}
            value={formData[budgetDeviationConfig.year] as number}
            // permissionForm={joinPermissions([
            //   accessNamesConfig.BUDGET__REPORT_PAGE,
            //   accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
            // ])}
            showError={haveSubmitedForm}
          />
        </Grid>
        {/* </SectionGuard> */}

        {/* <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
            accessNamesConfig.FIELD_AREA,
          ])}
        > */}
        <Grid lg={2}>
          <AreaInput
            setter={setFormData}
            value={formData[budgetDeviationConfig.area]}
            // permissionForm={joinPermissions([
            //   accessNamesConfig.BUDGET__REPORT_PAGE,
            //   accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
            // ])}
            level={3}
            showError={haveSubmitedForm}
          />
        </Grid>
        {/* </SectionGuard> */}

        {/* <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
            accessNamesConfig.FIELD_BUDGET_METHOD,
          ])}
        > */}
        <Grid xs={2}>
          <BudgetKindDeviationInput
            setter={setFormData}
            value={formData[budgetDeviationConfig.kind] as number}
            // permissionForm={joinPermissions([
            //   accessNamesConfig.BUDGET__REPORT_PAGE,
            //   accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
            // ])}
            showError={haveSubmitedForm}
          />
        </Grid>
        {/* </SectionGuard> */}

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

export default BudgetReportDeviationForm;
