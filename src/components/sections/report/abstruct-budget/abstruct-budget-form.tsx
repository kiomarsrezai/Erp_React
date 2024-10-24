import PrintIcon from "@mui/icons-material/Print";
import GetAppIcon from "@mui/icons-material/GetApp";

import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import IconButton from "@mui/material/IconButton";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import {
  generalFieldsConfig,
  organItems,
} from "config/features/general-fields-config";
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
import {
  getGeneralFieldItemBudgetKind,
  getGeneralFieldItemNumber,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import NumbersInput from "components/sections/inputs/numbers-input";
import { convertNumbers } from "helper/number-utils";
import { abstructBudgetStimul } from "stimul/budget/report/abstruct/abstruct-budget-stimul";
import { abstructBudgetXlsx } from "stimul/budget/report/abstruct/abstruct-budget-xlsx";
import FlotingLabelSelect from "../../../ui/inputs/floting-label-select";

interface RevenueChartFormProps {
  formData: any;
  printData: {
    data: any[];
    footer: any[];
    bottomFooter: any[];
    moreBottomFooter: any[];
  };
  setFormData: (prevState: any) => void;
  tabRender?: ReactNode;
}

function AbstructBudgetForm(props: RevenueChartFormProps) {
  const { formData, setFormData, tabRender, printData } = props;
  const userLicenses = userStore((state) => state.permissions);

  const formatAndBindData = (data?: any[]) => {
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
        "balanceMosavab",
        "mosavabNeyabati",
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
        // accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY_KIND,
        // accessNamesConfig.FIELD_ORGAN,
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
        // abstructBudgetConfig.ORGAN,
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
    formData[abstructBudgetConfig.TYPE],
  ]);

  // print
  const handlePrintForm = () => {
    if (printData.data.length) {
      const yearLabel = getGeneralFieldItemYear(formData, 1);
      const budgetKindLabel = getGeneralFieldItemBudgetKind(formData);
      const numberLabel = getGeneralFieldItemNumber(formData);
      abstructBudgetStimul({
        data: printData.data,
        footer: printData.footer,
        bottomFooter: printData.bottomFooter,
        moreBottomFooter: printData.moreBottomFooter,
        year: yearLabel,
        budgetKind: budgetKindLabel,
        numberShow: numberLabel,
      });
    }
  };

  const handleExcelClick = () => {
    if (printData.data.length) {
      // const yearLabel = getGeneralFieldItemYear(formData, 1);
      // const budgetKindLabel = getGeneralFieldItemBudgetKind(formData);
      // const numberLabel = getGeneralFieldItemNumber(formData);
      abstructBudgetXlsx({
        data: printData.data,
        footer: [
          printData.footer[0],
          printData.bottomFooter[0],
          printData.moreBottomFooter[0],
        ],
        // bottomFooter: printData.bottomFooter,
        // moreBottomFooter: printData.moreBottomFooter,
        // year: yearLabel,
        // budgetKind: budgetKindLabel,
        // numberShow: numberLabel,
      });
    }
  };

  return (
    <>
      <Box component="form" padding={1} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {tabRender && <Grid xs={12}>{tabRender}</Grid>}

          {/* <SectionGuard
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
          </SectionGuard> */}
          <Grid xs={2}>
            <FlotingLabelSelect
                label="نوع"
                name={generalFieldsConfig.TYPE}
                setter={setFormData}
                value={formData[abstructBudgetConfig.TYPE] as string}
                items={[{value:'mosavab', label:'مصوب'}, {value:'eslahi', label:'اصلاحیه'}]}
                showError={haveSubmitedForm}
            />
          </Grid>
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

          {/* <SectionGuard
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
          </SectionGuard> */}

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
            <IconButton color="primary" onClick={handlePrintForm}>
              <PrintIcon />
            </IconButton>

            <IconButton color="primary" onClick={handleExcelClick}>
              {/* <PrintIcon /> */}
              <GetAppIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AbstructBudgetForm;
