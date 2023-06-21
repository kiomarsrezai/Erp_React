import { useQuery } from "@tanstack/react-query";
import { propertyMotorApi } from "api/property/property-motor-api";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { propertyMotorConfig } from "config/features/property/property-motor-config";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";

interface PropertMotorSystemInputProps {
  setter: (prevData: any) => void;
  value: number;
  showError?: boolean;
}

function PropertMotorSystemInput(props: PropertMotorSystemInputProps) {
  const { setter, value, showError } = props;

  const kindQuery = useQuery(["cat-system"], () =>
    propertyMotorApi.systemCombo()
  );

  const inputItems: FlotingLabelTextfieldItemsShape = kindQuery.data
    ? kindQuery.data.data.map((item) => ({
        label: item.systemName,
        value: item.id,
      }))
    : [];

  return (
    <FlotingLabelSelect
      label="سیستم وسیله"
      name={propertyMotorConfig.system}
      items={inputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default PropertMotorSystemInput;
