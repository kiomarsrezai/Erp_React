import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { budgetKindDeviationItems } from "config/features/general-fields-config";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";

interface BudgetKindDeviationInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  showError?: boolean;
}

function BudgetKindDeviationInput(props: BudgetKindDeviationInputProps) {
  const { setter, value, permissionForm, showError } = props;
  // const userLicenses = userStore((state) => state.permissions);

  // const inputItems = permissionForm
  //   ? filedItemsGuard(
  //       budgetKindDeviationItems,
  //       userLicenses,
  //       joinPermissions([
  //         permissionForm || "",
  //         accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY_KIND,
  //       ])
  //     )
  //   : budgetKindDeviationItems;

  return (
    <FlotingLabelSelect
      label="نوع نمایش"
      name={budgetDeviationConfig.kind}
      items={budgetKindDeviationItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default BudgetKindDeviationInput;
