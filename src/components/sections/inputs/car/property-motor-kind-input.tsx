import { useQuery } from "@tanstack/react-query";
import { propertyMotorApi } from "api/property/property-motor-api";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { propertyMotorConfig } from "config/features/property/property-motor-config";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";

interface propertMotorKindInputProps {
  setter: (prevData: any) => void;
  value: number;
  showError?: boolean;
}

function propertMotorKindInput(props: propertMotorKindInputProps) {
  const { setter, value, showError } = props;

  const kindQuery = useQuery(["kind-tip"], () => propertyMotorApi.kindCombo());

  const inputItems: FlotingLabelTextfieldItemsShape = kindQuery.data
    ? kindQuery.data.data.map((item) => ({
        label: item.kindName,
        value: item.id,
      }))
    : [];

  return (
    <FlotingLabelSelect
      label="نوع ماشین"
      name={propertyMotorConfig.tip}
      items={inputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default propertMotorKindInput;
