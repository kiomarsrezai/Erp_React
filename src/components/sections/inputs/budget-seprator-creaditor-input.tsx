import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import { budgetKindItems } from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { useQuery } from "@tanstack/react-query";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent } from "react";

interface BudgetSepratorCreaditorInputProps {
  setter: (prevData: any) => void;
  value: any;
  permissionForm?: string;
  showError?: boolean;
}

function BudgetSepratorCreaditorInput(
  props: BudgetSepratorCreaditorInputProps
) {
  const { setter, value, permissionForm, showError } = props;
  const userLicenses = userStore((state) => state.permissions);

  const kindQuery = useQuery(
    ["seprator-creaditor-kind"],
    () => sepratorCreaditorBudgetApi.getCombo(),
    {
      onSuccess: () => {},
    }
  );

  const inputItems: FlotingLabelTextfieldItemsShape = kindQuery.data
    ? kindQuery.data.data.map((item) => ({
        label: item.creaditorName,
        value: item.id,
      }))
    : [];

  const toggleItem = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setter((prevState: any) => {
      let itemValue = prevState[sepratorCreaditorBudgetConfig.creaditorId];
      itemValue[value] = checked;
      // if (itemValue.find(value)) {
      // } else {
      //   itemValue = [...itemValue, value];
      // }

      const result = {
        ...prevState,
        [sepratorCreaditorBudgetConfig.creaditorId]: itemValue,
      };

      return result;
    });
  };

  return (
    // <FlotingLabelSelect
    //   label="اعتبار"
    //   name={sepratorCreaditorBudgetConfig.creaditorId}
    //   items={inputItems}
    //   value={value}
    //   setter={setter}
    //   showError={showError}
    // />
    <FormGroup>
      {inputItems.map((item) => (
        <FormControlLabel
          control={
            <Checkbox
              value={item.value}
              checked={value?.[item.value] === true}
              onChange={toggleItem}
            />
          }
          label={item.label}
        />
      ))}
    </FormGroup>
  );
}

export default BudgetSepratorCreaditorInput;
