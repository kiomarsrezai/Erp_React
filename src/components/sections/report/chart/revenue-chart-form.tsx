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

interface RevenueChartFormProps {
  formData: any;
  setFormData: (prevState: any) => void;
  inputRender?: ReactNode;
}
function RevenueChartForm(props: RevenueChartFormProps) {
  const { formData, setFormData, inputRender } = props;
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
      accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE
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
      accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE
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

  return (
    <>
      <Box component="form" padding={2} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {inputRender && <Grid xs={2}>{inputRender}</Grid>}

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE,
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
                    accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE,
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
              accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid xs={2}>
              <YearInput
                setter={setFormData}
                value={formData[revenueChartFormConfig.YEAR] as number}
                permissionForm={accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          {!(formData[revenueChartFormConfig.ORGAN] === 4) && (
            <SectionGuard
              permission={joinPermissions([
                accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE,
                accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE_CENTER,
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
                      accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE,
                      accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE_CENTER,
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
              accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE,
              accessNamesConfig.FIELD_BUDGET_METHOD,
            ])}
          >
            <Grid xs={2}>
              <BudgetMethodInput
                setter={setFormData}
                value={formData[revenueChartFormConfig.BUDGET_METHOD] as number}
                permissionForm={accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE}
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

              <CheckboxLabeled
                label="نیابتی"
                name={revenueChartFormConfig.NIABATI}
                value={formData[revenueChartFormConfig.NIABATI]}
                setter={setFormData}
                disabled={formData[revenueChartFormConfig.BUDGET_METHOD] !== 1}
              />

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
            </Stack>
          </Grid>
        </Grid>
      </Box>

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
    </>
  );
}

export default RevenueChartForm;
