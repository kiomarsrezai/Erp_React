import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import CheckboxLabeled from "components/ui/inputs/checkbox-labeled";
import YearInput from "components/sections/inputs/year-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";

import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { useState, useEffect } from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revenueChartApi } from "api/report/chart-api";
import { reactQueryKeys } from "config/react-query-keys-config";

function RevenueChartForm() {
  const [formData, setFormData] = useState({
    [revenueChartFormConfig.YEAR]: 32,
    [revenueChartFormConfig.CENTER]: 2,
    [revenueChartFormConfig.ORGAN]: 3,
    [revenueChartFormConfig.BUDGET_METHOD]: 1,
    [revenueChartFormConfig.REVENUE]: true,
    [revenueChartFormConfig.SALE]: true,
    [revenueChartFormConfig.LAON]: true,
    [revenueChartFormConfig.NIABATI]: true,
  });

  // input items
  const centerItems: FlotingLabelTextfieldItemsShape = [
    {
      label: "با مرکز",
      value: 1,
    },
    {
      label: "بدون مرکز",
      value: 2,
    },
  ];

  const organItems: FlotingLabelTextfieldItemsShape = [
    {
      label: "شهرداری",
      value: 3,
    },
    {
      label: "سازمانها",
      value: 4,
    },
  ];

  // submit
  const queryClient = useQueryClient();

  const submitMutation = useMutation(revenueChartApi.getChart, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.report.chart.revenue, data);
    },
  });

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.report.chart.revenue, {
      data: [[], [], [], []],
    });
  }, [formData, queryClient]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitMutation.mutate(formData);
      }}
    >
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid lg={2}>
            <FlotingLabelSelect
              label="سازمان"
              name={revenueChartFormConfig.ORGAN}
              items={organItems}
              value={formData[revenueChartFormConfig.ORGAN]}
              setter={setFormData}
            />
          </Grid>
          <Grid lg={2}>
            <YearInput
              setter={setFormData}
              value={formData[revenueChartFormConfig.YEAR] as number}
            />
          </Grid>
          <Grid lg={2}>
            <FlotingLabelSelect
              label="مرکز"
              name={revenueChartFormConfig.CENTER}
              items={centerItems}
              value={formData[revenueChartFormConfig.CENTER]}
              setter={setFormData}
            />
          </Grid>

          <Grid lg={2}>
            <BudgetMethodInput
              setter={setFormData}
              value={formData[revenueChartFormConfig.BUDGET_METHOD] as number}
            />
          </Grid>
          {
            <Grid lg={4}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                <CheckboxLabeled
                  label="درآمد"
                  name={revenueChartFormConfig.REVENUE}
                  value={formData[revenueChartFormConfig.REVENUE]}
                  setter={setFormData}
                  disabled={
                    formData[revenueChartFormConfig.BUDGET_METHOD] !== 1
                  }
                />
                <CheckboxLabeled
                  label="فروش اموال"
                  name={revenueChartFormConfig.SALE}
                  value={formData[revenueChartFormConfig.SALE]}
                  setter={setFormData}
                  disabled={
                    formData[revenueChartFormConfig.BUDGET_METHOD] !== 1
                  }
                />
                <CheckboxLabeled
                  label="وام و اوراق"
                  name={revenueChartFormConfig.LAON}
                  value={formData[revenueChartFormConfig.LAON]}
                  setter={setFormData}
                  disabled={
                    formData[revenueChartFormConfig.BUDGET_METHOD] !== 1
                  }
                />
                <CheckboxLabeled
                  label="نیابتی"
                  name={revenueChartFormConfig.NIABATI}
                  value={formData[revenueChartFormConfig.NIABATI]}
                  setter={setFormData}
                  disabled={
                    formData[revenueChartFormConfig.BUDGET_METHOD] !== 1
                  }
                />

                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={submitMutation.isLoading}
                >
                  نمایش
                </LoadingButton>
                <Button variant="contained">ریز مقادیر</Button>
              </Stack>
            </Grid>
          }
        </Grid>
      </Box>
    </form>
  );
}

export default RevenueChartForm;
