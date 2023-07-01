import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import { budgetKindItems } from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";
import { Checkbox, FormControlLabel, FormGroup, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ChangeEvent, useState } from "react";
import { areaGeneralApi } from "api/general/area-general-api";
import WindowLoading from "components/ui/loading/window-loading";
import {
  getGeneralFieldItemAreaFromId,
  getGeneralFieldItemMonth,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import { budgetExpenseXlsx } from "stimul/budget/report/expense/budget-expense-xlsx";
import { budgetReportExpenseApi } from "api/report/budget-expense-api";
import { budgetReportExpenseConfig } from "config/features/budget/report/budget-report-expense-config";

interface BudgetReportExpenseAreaModalProps {
  printData: any;
  formData: any;
  onClose: any;
}
function BudgetReportExpenseAreaModal(
  props: BudgetReportExpenseAreaModalProps
) {
  const { printData, formData } = props;

  const areaQuery = useQuery(["general-area", 3], () =>
    areaGeneralApi.getData(3)
  );

  const areaItems: FlotingLabelTextfieldItemsShape = areaQuery.data
    ? areaQuery.data.data.map((item) => ({
        label: item.areaName,
        value: item.id,
      }))
    : [];

  // form
  const [selectedAreas, setSelectedAreas] = useState<any>({});
  const toggleItem = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedAreas((prevState: any) => {
      prevState[value] = checked;

      return { ...prevState, [value]: checked };
    });
  };

  //   print
  const getExcelManateghMutation = useMutation(
    budgetReportExpenseApi.getExcelManateghData
  );
  const getExcelSazmanMutation = useMutation(
    budgetReportExpenseApi.getExcelSazmanData
  );

  const [printLoading, setPrintLoading] = useState(false);
  const handlePrintClick = async () => {
    setPrintLoading(true);
    const areas = [
      1,
      // , 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
      // 23, 24, 25, 26,
    ];

    areas.forEach((item) => {
      handlePrintForm(item);
    });
    setPrintLoading(false);
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
      const yearLabel = getGeneralFieldItemYear(formData, 1);
      const areaLabel = getGeneralFieldItemAreaFromId(3, areaId);
      const monthLabel = getGeneralFieldItemMonth(formData);
      // budgetExpenseStimul({
      //   culmnsData: culmnsData,
      //   year: yearLabel,
      //   area: areaLabel,
      //   numberShow: "ریال",
      //   month: monthLabel,
      // });
      budgetExpenseXlsx({
        culmnsData: culmnsData,
        year: yearLabel,
        area: areaLabel,
        numberShow: "ریال",
        month: monthLabel,
      });
    }
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
            {areaItems.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    value={item.value}
                    checked={selectedAreas?.[item.value] === true}
                    onChange={toggleItem}
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
            onClick={handlePrintClick}
            loading={
              getExcelManateghMutation.isLoading ||
              getExcelSazmanMutation.isLoading ||
              printLoading
            }
          >
            پرینت
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

export default BudgetReportExpenseAreaModal;
