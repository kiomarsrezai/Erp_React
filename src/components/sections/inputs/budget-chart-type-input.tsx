import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { budgetReportItems } from "config/features/general-fields-config";

interface BudgetReportTypeInputProps {
  setter: (prevData: any) => void;
  value: number | null;
  permissionForm?: string;
  name: string;
}

function BudgetReportTypeInput(props: BudgetReportTypeInputProps) {
  const { setter, value, permissionForm, name } = props;
  const userLicenses = userStore((state) => state.permissions);

  const inputItems = permissionForm
    ? filedItemsGuard(
        budgetReportItems,
        userLicenses,
        joinPermissions([
          permissionForm || "",
          accessNamesConfig.BUDGET__REPORT_PAGE_COMBO,
        ])
      )
    : budgetReportItems;

  return (
    <FlotingLabelSelect
      label="نوع گزارش"
      name={name}
      items={inputItems}
      value={value}
      setter={setter}
    />
  );
}

export default BudgetReportTypeInput;
