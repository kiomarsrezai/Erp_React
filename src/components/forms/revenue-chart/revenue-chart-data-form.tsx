import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { useState } from "react";
import { revenueChartFormConfig } from "config/formdata/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revenueChartApi } from "api/report/chart-api";

function RevenueChartDataForm() {
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

  console.log(formData);

  const yearItems: FlotingLabelTextfieldItemsShape = [
    {
      label: "1401",
      value: 32,
    },
    {
      label: "1402",
      value: 33,
    },
  ];

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

  const budgetMethodItems: FlotingLabelTextfieldItemsShape = [
    {
      label: "درآمد/منابع",
      value: 1,
    },
    {
      label: "جاری / هزینه ای",
      value: 2,
    },
    {
      label: "عمرانی / سرمایه ای",
      value: 3,
    },
    {
      label: "مالی",
      value: 4,
    },
    {
      label: "دیون قطعی سنواتی",
      value: 5,
    },
  ];

  const queryClient = useQueryClient();

  const submitMutation = useMutation(revenueChartApi.getChart, {
    onSuccess: (data) => {
      console.log("data", data.data);
      queryClient.setQueryData(["revenuse-chart"], data);
    },
  });

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
            <FlotingLabelSelect
              label="سال"
              name={revenueChartFormConfig.YEAR}
              items={yearItems}
              value={formData[revenueChartFormConfig.YEAR]}
              setter={setFormData}
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
            <FlotingLabelSelect
              label="نوع بودجه"
              name={revenueChartFormConfig.BUDGET_METHOD}
              items={budgetMethodItems}
              value={formData[revenueChartFormConfig.BUDGET_METHOD]}
              setter={setFormData}
            />
          </Grid>
          <Grid lg={4}>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography variant="body2">مرا به خاطر بسپار</Typography>
                }
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography variant="body2">مرا به خاطر بسپار</Typography>
                }
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography variant="body2">مرا به خاطر بسپار</Typography>
                }
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography variant="body2">مرا به خاطر بسپار</Typography>
                }
              />

              <Button variant="contained" type="submit">
                نمایش
              </Button>
              <Button variant="contained">ریز مقادیر</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default RevenueChartDataForm;
