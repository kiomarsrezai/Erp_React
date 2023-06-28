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
  generalFieldsConfig,
  organItems,
  organItems2,
} from "config/features/general-fields-config";
import { budgetReportExpenseConfig } from "config/features/budget/report/budget-report-expense-config";
import { budgetReportExpenseApi } from "api/report/budget-expense-api";
import NumbersInput from "components/sections/inputs/numbers-input";
import { convertNumbers } from "helper/number-utils";
import MonthInput from "components/sections/inputs/month-input";
import { budgetExpenseStimul } from "stimul/budget/report/expense/budget-expense-stimul";

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

  const formatAndBindData = (data?: any[]) => {
    const formatedData = convertNumbers(
      data || submitMutation.data?.data || [],
      [
        "mosavabRevenue",
        "expenseRevenue",

        "mosavabCurrent",
        "expenseCurrent",

        "mosavabCivil",
        "expenseCivil",
        "creditAmountCivil",

        "mosavabFinancial",
        "expenseFinancial",

        "mosavabSanavati",
        "expenseSanavati",

        "mosavabPayMotomarkez",
        "expensePayMotomarkez",

        "mosavabDar_Khazane",
        "expenseDar_Khazane",

        "balance",
      ],
      formData[generalFieldsConfig.numbers]
    );

    queryClient.setQueryData(reactQueryKeys.budget.expense, {
      data: formatedData,
    });
  };

  useEffect(() => {
    formatAndBindData();
  }, [formData[generalFieldsConfig.numbers]]);

  // form
  const queryClient = useQueryClient();
  const submitMutation = useMutation(budgetReportExpenseApi.getData, {
    onSuccess: (data) => {
      // queryClient.setQueryData(reactQueryKeys.budget.expense, data);
      formatAndBindData(data.data);
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
        budgetReportExpenseConfig.month,
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
    formData[budgetReportExpenseConfig.month],
  ]);

  // print
  const getExcelManateghMutation = useMutation(
    budgetReportExpenseApi.getExcelManateghData
  );
  const getExcelSazmanMutation = useMutation(
    budgetReportExpenseApi.getExcelSazmanData
  );

  const handlePrintClick = async () => {
    const areas = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
      23, 24, 25, 26,
    ];

    areas.forEach((item) => {
      handlePrintForm(item);
    });
  };

  const handlePrintForm = async (areaId: number) => {
    let culmnsData: any = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    };

    const culmnKeys = Object.keys(culmnsData);

    try {
      await Promise.all(
        culmnKeys.map(async (item) => {
          const data = await (areaId < 10
            ? getExcelManateghMutation
            : getExcelSazmanMutation
          ).mutateAsync({
            budgetProcessId: item,
            areaId: areaId,
            monthId: formData[budgetReportExpenseConfig.month],
            yearId: formData[budgetReportExpenseConfig.year],
          });

          culmnsData = {
            ...culmnsData,
            [item]: data.data,
          };
        })
      );
    } catch {}

    if (printData.data.length) {
      // const yearLabel = getGeneralFieldItemYear(formData, 1);
      // const areaLabel = getGeneralFieldItemArea(formData, 3);
      // const budgetKindLabel = getGeneralFieldItemProjectScale(formData);
      budgetExpenseStimul({
        culmnsData: culmnsData,
        // footer: printData.footer,
        footer: [],
        year: "yearLabel",
        area: "areaLabel",
        kind: "budgetKindLabel",
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
              value={formData[budgetReportExpenseConfig.year] as number}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
              ])}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <Grid xs={2}>
          <MonthInput
            setter={setFormData}
            value={formData[budgetReportExpenseConfig.month] as number}
            showError={haveSubmitedForm}
          />
        </Grid>

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
              name={budgetReportExpenseConfig.organ}
              items={filedItemsGuard(
                organItems2,
                userLicenses,
                joinPermissions([
                  accessNamesConfig.BUDGET__REPORT_PAGE,
                  accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
                  accessNamesConfig.FIELD_ORGAN,
                ])
              )}
              value={formData[budgetReportExpenseConfig.organ]}
              setter={setFormData}
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
            sx={{ mr: 1 }}
          >
            نمایش
          </LoadingButton>

          <IconButton color="primary" onClick={handlePrintClick}>
            <PrintIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BudgetReportExpenseForm;
