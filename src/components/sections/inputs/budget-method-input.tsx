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
}

function BudgetMethodInput(props: BudgetMethodInputProps) {
  const { setter, value, permissionForm } = props;
  const userLicenses = userStore((state) => state.permissions);

  return (
    <FlotingLabelSelect
      label="نوع بودجه"
      name={generalFieldsConfig.BUDGET_METHOD}
      items={filedItemsGuard(
        budgetMethodItems,
        userLicenses,
        joinPermissions([
          permissionForm || "",
          accessNamesConfig.FIELD_BUDGET_METHOD,
        ])
      )}
      value={value}
      setter={setter}
    />
  );
}

export default BudgetMethodInput;
