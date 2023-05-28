import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import {
  budgetMethodItems,
  generalFieldsConfig,
  numbersItems,
} from "config/features/general-fields-config";

interface BudgetMethodInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  showError?: boolean;
}

function NumbersInput(props: BudgetMethodInputProps) {
  const { setter, value } = props;

  return (
    <FlotingLabelSelect
      label="نمایش ارقام"
      name={generalFieldsConfig.numbers}
      items={numbersItems}
      value={value}
      setter={setter}
    />
  );
}

export default NumbersInput;
