import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import {
  budgetKindItems,
  budgetMethodItems,
  generalFieldsConfig,
  monthItems,
} from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Radio,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ChangeEvent, useState } from "react";
import { areaGeneralApi } from "api/general/area-general-api";
import WindowLoading from "components/ui/loading/window-loading";
import {
  getGeneralFieldItemArea,
  getGeneralFieldItemAreaFromId,
  getGeneralFieldItemMonth,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import { budgetExpenseXlsx } from "stimul/budget/report/expense/budget-expense-xlsx";
import { budgetReportExpenseApi } from "api/report/budget-expense-api";
import { budgetReportExpenseConfig } from "config/features/budget/report/budget-report-expense-config";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { budgetSepratorXlsx } from "stimul/budget/seprator/budget-seprator-xlsx";

interface SepratorModalPrintProps {
  formData: any;
}

function SepratorModalPrint(props: SepratorModalPrintProps) {
  const { formData } = props;

  const [activeMonth, setActiveMonth] = useState<any>(undefined);
  const userLicenses = userStore((state) => state.permissions);

  const budgetMethodAccessItems = filedItemsGuard(
    budgetMethodItems,
    userLicenses,
    joinPermissions([
      accessNamesConfig.BUDGET__SEPRATOR_PAGE,
      accessNamesConfig.FIELD_BUDGET_METHOD,
    ])
  );

  const getExcelManateghMutation = useMutation(
    budgetReportExpenseApi.getExcelManateghData
  );
  const getExcelSazmanMutation = useMutation(
    budgetReportExpenseApi.getExcelSazmanData
  );

  const handleExcelForm = async () => {
    let culmnsData: any = {};
    budgetMethodAccessItems.forEach((item) => {
      culmnsData[item.value] = [];
    });

    const culmnKeys = Object.keys(culmnsData);

    try {
      await Promise.all(
        culmnKeys.map(async (item) => {
          const data = await (formData[sepratorBudgetConfig.AREA] < 10
            ? getExcelManateghMutation
            : getExcelSazmanMutation
          ).mutateAsync({
            ...formData,
            [generalFieldsConfig.MONTH]: activeMonth,
            [sepratorBudgetConfig.BUDGET_METHOD]: item,
          });

          culmnsData = {
            ...culmnsData,
            [item]: data.data,
          };
        })
      );
    } catch {}

    // const yearLabel = getGeneralFieldItemYear(formData, 1);

    const areaLabel = getGeneralFieldItemArea(formData, 2);
    // const monthLabel = getGeneralFieldItemMonth(formData);

    budgetSepratorXlsx({
      culmnsData: culmnsData,
      area: areaLabel,
    });
  };

  return (
    <>
      <Box sx={{ mx: "auto", p: 2 }}>
        <Box
          sx={{
            height: "calc(100% - 55px) !important",
            overflow: "auto",
          }}
        >
          <FormGroup>
            {monthItems.map((item) => (
              <FormControlLabel
                control={
                  <Radio
                    name="month"
                    value={item.value}
                    checked={activeMonth === item.value}
                    onChange={() => setActiveMonth(item.value)}
                  />
                }
                label={item.label}
              />
            ))}
          </FormGroup>
        </Box>

        <Box sx={{ height: "55px !important" }}>
          <LoadingButton
            variant="contained"
            sx={{ mt: 1, mb: 3 }}
            onClick={handleExcelForm}
            loading={
              getExcelManateghMutation.isLoading ||
              getExcelSazmanMutation.isLoading
            }
          >
            تایید
          </LoadingButton>
        </Box>
      </Box>

      {/* <WindowLoading
      active={
        getExcelManateghMutation.isLoading ||
        getExcelSazmanMutation.isLoading ||
        printLoading
      }
    /> */}
    </>
  );
}

export default SepratorModalPrint;
