import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import { accessNamesConfig } from "config/access-names-config";
import {
  budgetMethodItems,
  generalFieldsConfig,
} from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import userStore from "hooks/store/user-store";

interface BudgetMethodInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  showError?: boolean;
}

function BudgetMethodInput(props: BudgetMethodInputProps) {
  const { setter, value, permissionForm, showError } = props;
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

  return (
    <FlotingLabelSelect
      label="نوع بودجه"
      name={generalFieldsConfig.BUDGET_METHOD}
      items={inputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default BudgetMethodInput;
