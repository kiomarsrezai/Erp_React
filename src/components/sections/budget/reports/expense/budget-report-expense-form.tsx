import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import LoadingButton from "@mui/lab/LoadingButton";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import {
  checkHavePermission,
  filedItemsGuard,
  joinPermissions,
} from "helper/auth-utils";
import AreaInput from "components/sections/inputs/area-input";
import { ravandChartConfig } from "config/features/report/chart/ravand-chart-config";
import { ravandChartApi } from "api/report/ravand-chart-api";
import YearInput from "components/sections/inputs/year-input";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import BudgetKindDeviationInput from "components/sections/inputs/budget-kind-deviation-input";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { budgetDivationStimul } from "stimul/budget/report/divation/budget-divation-stimul";
import {
  getGeneralFieldItemArea,
  getGeneralFieldItemBudgetKindDeviation,
  getGeneralFieldItemProjectScale,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import ProjectScaleInput from "components/sections/inputs/project-scale-input";
import { budgetProjectOprationConfig } from "config/features/budget/report/budget-project-opration-config";
import { budgetProjectOprationApi } from "api/report/budget-project-opration-api";
import { budgetProjectScaleStimul } from "stimul/budget/report/project-scale/budget-project-scale-stimul";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import {
  centerItems,
  organItems,
  organItems2,
} from "config/features/general-fields-config";
import { budgetReportExpenseConfig } from "config/features/budget/report/budget-report-expense-config";
import { budgetReportExpenseApi } from "api/report/budget-expense-api";

interface BudgetReportExpenseFormProps {
  formData: any;
  setFormData: (prevState: any) => void;
  inputRender?: ReactNode;
  tabRender?: ReactNode;
  printData: {
    data: any[];
    footer: any[];
  };
}

function BudgetReportExpenseForm(props: BudgetReportExpenseFormProps) {
  const { formData, setFormData, inputRender, tabRender, printData } = props;

  const userLicenses = userStore((state) => state.permissions);
  // form
  const queryClient = useQueryClient();
  const submitMutation = useMutation(budgetReportExpenseApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.expense, data);
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [accessNamesConfig.FIELD_ORGAN, accessNamesConfig.FIELD_YEAR],
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
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
        budgetReportExpenseConfig.organ,
        budgetReportExpenseConfig.year,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  // reset
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.expense, {
      data: [],
    });
  }, [
    formData[budgetReportExpenseConfig.organ],
    formData[budgetReportExpenseConfig.year],
  ]);

  // print
  const handlePrintForm = () => {
    if (printData.data.length) {
      const yearLabel = getGeneralFieldItemYear(formData, 1);
      const areaLabel = getGeneralFieldItemArea(formData, 3);
      const budgetKindLabel = getGeneralFieldItemProjectScale(formData);
      budgetProjectScaleStimul({
        data: printData.data,
        footer: printData.footer,
        year: yearLabel,
        area: areaLabel,
        kind: budgetKindLabel,
        numberShow: "ریال",
      });
    }
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

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
            accessNamesConfig.FIELD_YEAR,
          ])}
        >
          <Grid xs={2}>
            <YearInput
              setter={setFormData}
              value={formData[budgetDeviationConfig.year] as number}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
              ])}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
            accessNamesConfig.FIELD_ORGAN,
          ])}
        >
          <Grid xs={2}>
            <FlotingLabelSelect
              label="سازمان"
              name={revenueChartFormConfig.ORGAN}
              items={filedItemsGuard(
                organItems2,
                userLicenses,
                joinPermissions([
                  accessNamesConfig.BUDGET__REPORT_PAGE,
                  accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
                  accessNamesConfig.FIELD_ORGAN,
                ])
              )}
              value={formData[revenueChartFormConfig.ORGAN]}
              setter={setFormData}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <Grid xs={2}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
            sx={{ mr: 1 }}
          >
            نمایش
          </LoadingButton>

          {/* <IconButton color="primary" onClick={handlePrintForm}>
            <PrintIcon />
          </IconButton> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default BudgetReportExpenseForm;
