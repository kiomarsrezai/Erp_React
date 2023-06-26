import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import {
  generalFieldsConfig,
  monthItems,
  trazKindItems,
} from "config/features/general-fields-config";

import { trazConfig } from "config/features/traz/traz-config";

interface TrazKindInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  showError: boolean;
}

function MonthInput(props: TrazKindInputProps) {
  const { setter, value, showError } = props;

  return (
    <FlotingLabelSelect
      label="ماه"
      name={generalFieldsConfig.MONTH}
      items={monthItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default MonthInput;
