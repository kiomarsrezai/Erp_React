import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import CheckboxLabeled from "components/ui/inputs/checkbox-labeled";
import YearInput from "components/sections/inputs/year-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import FixedModal from "components/ui/modal/fixed-modal";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import RevenueChartModal1 from "./revenue-chart-modal-1";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revenueChartApi } from "api/report/chart-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { centerItems, organItems } from "config/features/general-fields-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import {
  checkHavePermission,
  filedItemsGuard,
  joinPermissions,
} from "helper/auth-utils";
import { revenueChartStimul } from "stimul/budget/report/revenue/revenue-chart-stimul";
import {
  getGeneralFieldItemBudgetMethod,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import RevenueChartModalDetail from "./revenue-chart-modal-detail";

interface RevenueChartFormProps {
  formData: any;
  setFormData: (prevState: any) => void;
  inputRender?: ReactNode;
  tabRender?: ReactNode;
}
function RevenueChartForm(props: RevenueChartFormProps) {
  const { formData, setFormData, inputRender, tabRender } = props;
  const userLicenses = userStore((state) => state.permissions);

  // form
  const queryClient = useQueryClient();

  const submitMutation = useMutation(revenueChartApi.getChart, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.report.chart.revenue, data);
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
        accessNamesConfig.FIELD_BUDGET_METHOD,
        accessNamesConfig.FIELD_ORGAN,
      ],
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
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
        revenueChartFormConfig.YEAR,
        revenueChartFormConfig.BUDGET_METHOD,
        revenueChartFormConfig.ORGAN,
      ])
    ) {
      if (
        !(formData[revenueChartFormConfig.ORGAN] === 4) &&
        !formData[revenueChartFormConfig.CENTER]
      ) {
        return;
      }
      submitMutation.mutate(formData);
    }
  };

  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.report.chart.revenue, {
      data: [[], [], [], []],
    });
  }, [formData, queryClient]);

  // modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const dataTableMutation = useMutation(revenueChartApi.chartDetail);

  const handleClickDetailValues = () => {
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.FIELD_YEAR,
        accessNamesConfig.FIELD_BUDGET_METHOD,
        accessNamesConfig.FIELD_ORGAN,
      ],
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
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
        revenueChartFormConfig.YEAR,
        revenueChartFormConfig.BUDGET_METHOD,
        revenueChartFormConfig.ORGAN,
      ])
    ) {
      if (
        !(formData[revenueChartFormConfig.ORGAN] === 4) &&
        !formData[revenueChartFormConfig.CENTER]
      ) {
        return;
      }
      dataTableMutation.mutate(formData);
      handleOpenModal();
    }
  };

  // modal 2
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const handleCloseModal2 = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal2 = () => {
    setIsOpenModal(true);
  };

  const dataTable2Mutation = useMutation(revenueChartApi.chartDetail2);

  const handleClickDetail2Modal = () => {
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.FIELD_YEAR,
        accessNamesConfig.FIELD_BUDGET_METHOD,
        accessNamesConfig.FIELD_ORGAN,
      ],
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
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
        revenueChartFormConfig.YEAR,
        revenueChartFormConfig.BUDGET_METHOD,
        revenueChartFormConfig.ORGAN,
      ])
    ) {
      if (
        !(formData[revenueChartFormConfig.ORGAN] === 4) &&
        !formData[revenueChartFormConfig.CENTER]
      ) {
        return;
      }
      dataTable2Mutation.mutate(formData);
      handleOpenModal();
    }
  };

  // print
  const handlePrintForm = () => {
    const data = submitMutation.data?.data;
    if (data?.[0].length) {
      const yearLabel = getGeneralFieldItemYear(formData, 1);
      const budgetMethodLabel = getGeneralFieldItemBudgetMethod(formData);
      revenueChartStimul({
        year: yearLabel,
        budgetMethod: budgetMethodLabel,
      });
    }
  };

  return (
    <>
      <Box
        component="form"
        padding={2}
        onSubmit={handleSubmit}
        sx={{ bgcolor: "grey.200" }}
      >
        <Grid container spacing={2}>
          {tabRender && <Grid xs={12}>{tabRender}</Grid>}
          {inputRender && <Grid xs={2}>{inputRender}</Grid>}

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
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
                    accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
                    accessNamesConfig.FIELD_ORGAN,
                  ])
                )}
                value={formData[revenueChartFormConfig.ORGAN]}
                setter={setFormData}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid xs={2}>
              <YearInput
                setter={setFormData}
                value={formData[revenueChartFormConfig.YEAR] as number}
                permissionForm={joinPermissions([
                  accessNamesConfig.BUDGET__REPORT_PAGE,
                  accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
                ])}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          {!(formData[revenueChartFormConfig.ORGAN] === 4) && (
            <SectionGuard
              permission={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
                accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE_CENTER,
              ])}
            >
              <Grid xs={2}>
                <FlotingLabelSelect
                  label="مرکز"
                  name={revenueChartFormConfig.CENTER}
                  items={filedItemsGuard(
                    centerItems,
                    userLicenses,
                    joinPermissions([
                      accessNamesConfig.BUDGET__REPORT_PAGE,
                      accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
                      accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE_CENTER,
                    ])
                  )}
                  value={formData[revenueChartFormConfig.CENTER]}
                  setter={setFormData}
                  showError={haveSubmitedForm}
                />
              </Grid>
            </SectionGuard>
          )}

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
              accessNamesConfig.FIELD_BUDGET_METHOD,
            ])}
          >
            <Grid xs={2}>
              <BudgetMethodInput
                setter={setFormData}
                value={formData[revenueChartFormConfig.BUDGET_METHOD] as number}
                permissionForm={joinPermissions([
                  accessNamesConfig.BUDGET__REPORT_PAGE,
                  accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
                ])}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <Grid xs>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <CheckboxLabeled
                label="درآمد"
                name={revenueChartFormConfig.REVENUE}
                value={formData[revenueChartFormConfig.REVENUE]}
                setter={setFormData}
                disabled={formData[revenueChartFormConfig.BUDGET_METHOD] !== 1}
              />

              <CheckboxLabeled
                label="فروش اموال"
                name={revenueChartFormConfig.SALE}
                value={formData[revenueChartFormConfig.SALE]}
                setter={setFormData}
                disabled={formData[revenueChartFormConfig.BUDGET_METHOD] !== 1}
              />

              <CheckboxLabeled
                label="وام و اوراق"
                name={revenueChartFormConfig.LAON}
                value={formData[revenueChartFormConfig.LAON]}
                setter={setFormData}
                disabled={formData[revenueChartFormConfig.BUDGET_METHOD] !== 1}
              />

              {/* <CheckboxLabeled
                label="نیابتی"
                name={revenueChartFormConfig.NIABATI}
                value={formData[revenueChartFormConfig.NIABATI]}
                setter={setFormData}
                disabled={formData[revenueChartFormConfig.BUDGET_METHOD] !== 1}
              /> */}

              <LoadingButton
                variant="contained"
                type="submit"
                loading={submitMutation.isLoading}
              >
                نمایش
              </LoadingButton>
              <Button variant="contained" onClick={handleClickDetailValues}>
                ریز مقادیر
              </Button>
              <Button variant="contained" onClick={handleClickDetail2Modal}>
                ریز مقادیر 2
              </Button>
              <IconButton color="primary" onClick={handlePrintForm}>
                <PrintIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* modal detail 1 */}
      <FixedModal
        open={isOpenModal}
        handleClose={handleCloseModal}
        loading={dataTableMutation.isLoading}
      >
        <RevenueChartModal1
          formData={formData}
          data={dataTableMutation.data?.data || []}
        />
      </FixedModal>

      {/* modal detail 2 */}
      <FixedModal
        open={isOpenModal2}
        handleClose={handleCloseModal2}
        loading={dataTable2Mutation.isLoading}
      >
        <RevenueChartModalDetail
          formData={formData}
          data={dataTable2Mutation.data?.data || []}
        />
      </FixedModal>
    </>
  );
}

export default RevenueChartForm;
