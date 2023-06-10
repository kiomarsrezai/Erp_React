import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import {
  budgetMethodItems,
  generalFieldsConfig,
} from "config/features/general-fields-config";

interface BudgetMethodInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  showError?: boolean;
  ignoreItems?: number[];
}

function BudgetMethodInput(props: BudgetMethodInputProps) {
  const { setter, value, permissionForm, showError, ignoreItems } = props;
  const userLicenses = userStore((state) => state.permissions);

  const inputItems = permissionForm
    ? filedItemsGuard(
        budgetMethodItems,
        userLicenses,
        joinPermissions([
          permissionForm || "",
          accessNamesConfig.FIELD_BUDGET_METHOD,
        ])
      )
    : budgetMethodItems;

  const filteredInputItems = ignoreItems
    ? inputItems.filter((item) => !ignoreItems?.includes(item.value as any))
    : inputItems;

  return (
    <FlotingLabelSelect
      label="نوع بودجه"
      name={generalFieldsConfig.BUDGET_METHOD}
      items={filteredInputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default BudgetMethodInput;
