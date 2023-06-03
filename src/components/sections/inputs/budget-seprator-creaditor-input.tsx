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

interface BudgetSepratorCreaditorInputProps {
  setter: (prevData: any) => void;
  value: number;
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

  return (
    <FlotingLabelSelect
      label="اعتبار"
      name={sepratorCreaditorBudgetConfig.creaditorId}
      items={inputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default BudgetSepratorCreaditorInput;
