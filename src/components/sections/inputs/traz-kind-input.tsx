import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import { trazKindItems } from "config/features/general-fields-config";

import { trazConfig } from "config/features/traz/traz-config";

interface TrazKindInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
}

function TrazKindInput(props: TrazKindInputProps) {
  const { setter, value } = props;

  return (
    <FlotingLabelSelect
      label="نوع تراز"
      name={trazConfig.kind}
      items={trazKindItems}
      value={value}
      setter={setter}
    />
  );
}

export default TrazKindInput;
