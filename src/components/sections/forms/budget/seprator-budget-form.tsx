import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { sepratorBudgetFormConfig } from "config/formdata/budget/seprator";
import { useState } from "react";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { areaGeneralApi } from "api/general/area-general-api";
import { yearGeneralApi } from "api/general/year-general-api";

function SepratoeBudgetForm() {
  const [formData, setFormData] = useState({
    [sepratorBudgetFormConfig.YEAR]: 32,
    [sepratorBudgetFormConfig.AREA]: 1,
    [sepratorBudgetFormConfig.BUDGET_METHOD]: 1,
  });

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

  // year items
  const yearQuery = useQuery(["general-year"], yearGeneralApi.getData, {
    onSuccess: (data) => {
      setFormData((prevState) => ({
        ...prevState,
        [sepratorBudgetFormConfig.AREA]: data.data[0].id,
      }));
    },
  });

  const yearItems: FlotingLabelTextfieldItemsShape = yearQuery.data
    ? yearQuery.data.data.map((item) => ({
        label: item.yearName,
        value: item.id,
      }))
    : [];

  // area items
  const areaQuery = useQuery(
    ["general-area"],
    () => areaGeneralApi.getData(2),
    {
      onSuccess: (data) => {
        setFormData((prevState) => ({
          ...prevState,
          [sepratorBudgetFormConfig.AREA]: data.data[0].id,
        }));
      },
    }
  );

  const areaItems: FlotingLabelTextfieldItemsShape = areaQuery.data
    ? areaQuery.data.data.map((item) => ({
        label: item.areaName,
        value: item.id,
      }))
    : [];

  // submit
  const queryClient = useQueryClient();

  const submitMutation = useMutation(sepratorBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(["budget-seprator"], data);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        submitMutation.mutate(formData);
      }}
    >
      <Grid container spacing={2}>
        <Grid lg={2}>
          <FlotingLabelSelect
            label="سال"
            name={sepratorBudgetFormConfig.YEAR}
            items={yearItems}
            value={formData[sepratorBudgetFormConfig.YEAR]}
            setter={setFormData}
          />
        </Grid>
        <Grid lg={2}>
          <FlotingLabelSelect
            label="منطقه"
            name={sepratorBudgetFormConfig.AREA}
            items={areaItems}
            value={formData[sepratorBudgetFormConfig.AREA]}
            setter={setFormData}
          />
        </Grid>

        <Grid lg={2}>
          <FlotingLabelSelect
            label="نوع بودجه"
            name={sepratorBudgetFormConfig.BUDGET_METHOD}
            items={budgetMethodItems}
            value={formData[sepratorBudgetFormConfig.BUDGET_METHOD]}
            setter={setFormData}
          />
        </Grid>
        <Grid lg={4}>
          <Button variant="contained" type="submit">
            نمایش
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SepratoeBudgetForm;
