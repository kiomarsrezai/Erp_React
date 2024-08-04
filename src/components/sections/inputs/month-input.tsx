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
  showError?: boolean;
  yearlyLabel?: boolean;
  title?: string;
}

function MonthInput(props: TrazKindInputProps) {
  const { setter, value, showError } = props;

  return (
    <FlotingLabelSelect
      label={props.title??'ماه'}
      name={generalFieldsConfig.MONTH}
      items={props.yearlyLabel? [...monthItems, ...[{value: 13, label: 'سالانه'}]] : monthItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default MonthInput;
