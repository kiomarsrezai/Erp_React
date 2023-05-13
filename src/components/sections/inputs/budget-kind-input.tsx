import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import { budgetKindItems } from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";

interface BudgetMethodInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  showError?: boolean;
}

function BudgetKindInput(props: BudgetMethodInputProps) {
  const { setter, value, permissionForm, showError } = props;
  const userLicenses = userStore((state) => state.permissions);

  const inputItems = permissionForm
    ? filedItemsGuard(
        budgetKindItems,
        userLicenses,
        joinPermissions([
          permissionForm || "",
          accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE_KIND,
        ])
      )
    : budgetKindItems;

  return (
    <FlotingLabelSelect
      label="نوع بودجه"
      name={abstructBudgetConfig.KIND}
      items={inputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default BudgetKindInput;
