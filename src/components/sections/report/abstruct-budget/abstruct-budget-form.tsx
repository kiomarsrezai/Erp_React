import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import YearInput from "components/sections/inputs/year-input";
import Button from "@mui/material/Button";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import BudgetKindInput from "components/sections/inputs/budget-kind-input";

import { FormEvent, ReactNode, useEffect, useState } from "react";
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
import { stimulExport } from "helper/export-utils";

interface RevenueChartFormProps {
  formData: any;
  setFormData: (prevState: any) => void;
  tabRender?: ReactNode;
}

function AbstructBudgetForm(props: RevenueChartFormProps) {
  const { formData, setFormData, tabRender } = props;
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
        accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY_KIND,
        accessNamesConfig.FIELD_ORGAN,
      ],
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
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

  // print
  const handlePrintForm = () => {
    stimulExport(submitMutation.data?.data || [], {
      file: "proposal/report/abstruct-budget.mrt",
      header: "salam",
      headerDescription: "salam",
      // justExport: "print",
    });
    // loadreport([], "salam");
  };

  return (
    <>
      <Box component="form" padding={1} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {tabRender && <Grid xs={12}>{tabRender}</Grid>}

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
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
                    accessNamesConfig.BUDGET__REPORT_PAGE,
                    accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
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
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid xs={2}>
              <YearInput
                setter={setFormData}
                value={formData[abstructBudgetConfig.YEAR] as number}
                permissionForm={joinPermissions([
                  accessNamesConfig.BUDGET__REPORT_PAGE,
                  accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
                ])}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
              accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY_KIND,
            ])}
          >
            <Grid xs={2}>
              <BudgetKindInput
                setter={setFormData}
                value={formData[abstructBudgetConfig.KIND] as number}
                permissionForm={joinPermissions([
                  accessNamesConfig.BUDGET__REPORT_PAGE,
                  accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
                ])}
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
            <Button
              sx={{ mx: 1 }}
              variant="contained"
              onClick={handlePrintForm}
            >
              پرینت
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AbstructBudgetForm;
