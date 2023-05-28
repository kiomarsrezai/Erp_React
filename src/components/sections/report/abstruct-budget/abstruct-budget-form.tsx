import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import YearInput from "components/sections/inputs/year-input";
import Button from "@mui/material/Button";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import BudgetKindInput from "components/sections/inputs/budget-kind-input";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import {
  generalFieldsConfig,
  organItems,
} from "config/features/general-fields-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue, getGeneralFieldItem } from "helper/form-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { abstructBudgetApi } from "api/report/abstruct-budget-api";
import {
  checkHavePermission,
  filedItemsGuard,
  joinPermissions,
} from "helper/auth-utils";
import { stimulExport } from "helper/export-utils";
import NumbersInput from "components/sections/inputs/numbers-input";
import { convertNumbers } from "helper/number-utils";
import { GetSingleAbstructBudgetItemShape } from "types/data/report/abstruct-budget-type";
import { getPercent } from "helper/calculate-utils";

interface RevenueChartFormProps {
  formData: any;
  printData: {
    data: any[];
    footer: any[];
  };
  setFormData: (prevState: any) => void;
  tabRender?: ReactNode;
}

function AbstructBudgetForm(props: RevenueChartFormProps) {
  const { formData, setFormData, tabRender, printData } = props;
  const userLicenses = userStore((state) => state.permissions);

  const formatAndBindData = (data?: any[]) => {
    console.log(submitMutation.data?.data);

    const formatedData = convertNumbers(
      data || submitMutation.data?.data || [],
      [
        "mosavabRevenue",
        "mosavabPayMotomarkez",
        "mosavabDar_Khazane",
        "resoures",
        "mosavabCurrent",
        "mosavabCivil",
        "mosavabFinancial",
        "mosavabSanavati",
        "balanceMosavab",
      ],
      formData[generalFieldsConfig.numbers]
    );

    queryClient.setQueryData(reactQueryKeys.report.abstruct.getData, {
      data: formatedData,
    });
  };

  useEffect(() => {
    formatAndBindData();
  }, [formData[generalFieldsConfig.numbers]]);

  // form
  const queryClient = useQueryClient();

  const submitMutation = useMutation(abstructBudgetApi.getData, {
    onSuccess: (data) => {
      formatAndBindData(data.data);
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
  }, [
    formData[abstructBudgetConfig.ORGAN],
    formData[abstructBudgetConfig.KIND],
    formData[abstructBudgetConfig.YEAR],
  ]);

  // print
  const handlePrintForm = () => {
    const headerDescription = getGeneralFieldItem(queryClient, formData, [
      [generalFieldsConfig.ORGAN],
      [generalFieldsConfig.YEAR, 1],
      [generalFieldsConfig.kind],
    ]);
    stimulExport(printData.data, printData.footer, {
      file: "proposal/report/abstruct-budget.mrt",
      header: "خلاصه بودجه",
      headerDescription,
      justExport: "print",
    });
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

          <Grid xs={2}>
            <NumbersInput
              setter={setFormData}
              value={formData[generalFieldsConfig.numbers] as number}
            />
          </Grid>

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
