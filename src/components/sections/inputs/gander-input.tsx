import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import {
  ganderItems,
  generalFieldsConfig,
  monthItems,
  trazKindItems,
} from "config/features/general-fields-config";

import { trazConfig } from "config/features/traz/traz-config";

interface GanderInputProps {
  setter: (prevData: any) => void;
  value?: number;
  permissionForm?: string;
  showError?: boolean;
}

function GanderInput(props: GanderInputProps) {
  const { setter, value, showError } = props;

  return (
    <FlotingLabelSelect
      label="جنسیت"
      name={"gender"}
      items={ganderItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default GanderInput;
