import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import { budgetKindItems } from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { contractsTasksConfig } from "config/features/contracts/conreacts-tasks-config";

interface BudgetReportExpenseAreaModalProps {
  formData: any;
  onClose: any;
}
function TabAreaContractModal(props: BudgetReportExpenseAreaModalProps) {
  const { formData } = props;

  const areaQuery = useQuery(["general-area", 3], () =>
    areaGeneralApi.getData(3)
  );
  const userLicenses = userStore((state) => state.permissions);

  const inputItems: FlotingLabelTextfieldItemsShape = areaQuery.data
    ? areaQuery.data.data.map((item) => ({
        label: item.areaName,
        value: item.id,
      }))
    : [];

  const areaItems = filedItemsGuard(
    inputItems,
    userLicenses,
    joinPermissions([
      accessNamesConfig.CONTRACT__REPORT_PAGE,
      accessNamesConfig.FIELD_AREA,
    ])
  );
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

  const toggleAllItem = () => {
    setSelectedAreas(() => {
      let newValue: any = {};

      areaItems.forEach((areaItem) => {
        newValue[areaItem.value] = !isAllClicked;
      });

      return newValue;
    });
  };

  const isAllClicked = areaItems.reduce((preveius: any, curent: any) => {
    if (preveius === false) return false;

    return selectedAreas?.[curent.value] === true;
  }, true);

  // confrim
  const queryClient = useQueryClient();
  const readAreaMutation = useMutation(contractsTasksApi.areaRead, {
    onSuccess(data) {
      queryClient.setQueryData(
        reactQueryKeys.contracts.tasks.getArea,
        data.data
      );
    },
  });

  const areaInsertMutation = useMutation(contractsTasksApi.areaInsert, {
    onSuccess(data) {
      console.log({
        area: data.data,
      });
    },
  });

  const handleConfrimClick = async () => {
    let areas: any = [];

    for (const key in selectedAreas) {
      const value = selectedAreas?.[key];
      if (value === true) {
        areas.push(+key);
      }
    }

    try {
      await Promise.all(
        areas.map(async (item: any) => {
          await areaInsertMutation.mutateAsync({
            contractId: formData.id,
            areaId: item,
          });
        })
      );
    } catch {}

    readAreaMutation.mutate({
      id: formData.id,
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
            <FormControlLabel
              control={
                <Checkbox
                  value={"isAllClicked"}
                  checked={isAllClicked}
                  onChange={toggleAllItem}
                />
              }
              label={"همه"}
            />
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
            onClick={handleConfrimClick}
            loading={false}
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

export default TabAreaContractModal;
